package com.fashion.modules.report.service.impl;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.beust.jcommander.internal.Lists;
import com.fashion.commons.constants.Constants;
import com.fashion.commons.constants.RestURL;
import com.fashion.commons.enums.OrderType;
import com.fashion.commons.enums.SortType;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.modules.category.model.CategoryEntryMap;
import com.fashion.modules.category.repository.CategoryRepository;
import com.fashion.modules.comment.repository.CommentRepository;
import com.fashion.modules.product.domain.ProductDetail;
import com.fashion.modules.product.repository.ProductDetailRepository;
import com.fashion.modules.report.model.OrderRes;
import com.fashion.modules.report.model.OrderVM;
import com.fashion.modules.report.model.ReportRes;
import com.fashion.modules.report.model.StateOrderReportVM;
import com.fashion.modules.report.service.ReportService;
import com.fashion.service.impl.BaseService;

@Service
public class ReportServiceImpl extends BaseService implements ReportService {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private CategoryRepository cateRepo;

//	@Autowired
//	private CategoryService cateService;

	@Autowired
	private ProductDetailRepository productDetailRepo;

	@Autowired
	private CommentRepository commentRepo;

	@Override
	public ReportRes getOrderByDate(final String fromDate, final String toDate, final Integer top,
			final SortType sortOrder) {
		final ReportRes res = new ReportRes();
		final List<OrderVM> orders = getOrderByDateFromRest(fromDate, toDate, top, sortOrder);
		int total = orders.size();
		if (CollectionUtils.isNotEmpty(orders)) {
			final Set<Integer> productDetailIds = orders.parallelStream()
					.flatMap(it -> it.getOrderDetails().stream().map(i -> i.getProductDetailId()))
					.collect(Collectors.toSet());
			final List<ProductDetail> productDetailByIds = productDetailRepo.getProductDetailByIds(productDetailIds);
			final List<Integer> productId = productDetailByIds.parallelStream().map(it -> it.getProduct().getId())
					.collect(Collectors.toList());
			res.setRevenue(orders.parallelStream().map(it -> it.getTotal()).findAny().get());
			res.setReviews(commentRepo.getCommentInProductIds(getCurrentStoreId(), productId));
			res.setState(new StateOrderReportVM(getOrderStateNumber(OrderType.COMPLETE, orders, total),
					getOrderStateNumber(OrderType.CANCEL, orders, total),
					getOrderStateNumber(OrderType.PENDING, orders, total),
					getOrderStateNumber(OrderType.DELIVER, orders, total)));
		} else {
			res.setRevenue(BigDecimal.ZERO);
			res.setReviews(0);
		}
		final List<CategoryEntryMap> categories = cateRepo.getCategoryAndCountProduct(getCurrentStoreId());
		res.setCategory(categories);
		res.setCustomer(orders.size());
		res.setOrder(total);
		final Pair<List<Integer>, List<Integer>> revenuesAndSale = appendDataReport(getRevenuesAndSalesReport());
		res.setRevenues(revenuesAndSale.getLeft());
		res.setSales(revenuesAndSale.getRight());
		return res;
	}

	private Integer getOrderStateNumber(final OrderType type, final List<OrderVM> orders, final Integer total) {
		if (CollectionUtils.isNotEmpty(orders)) {
			return (int) orders.parallelStream().filter(it -> type.equals(it.getState())).count();
		}
		return null;
	}

	private List<OrderVM> getOrderByDateFromRest(final String fromDate, final String toDate, final Integer top,
			final SortType sortOrder) {
		final String uri = Constants.ORDER_URL + RestURL.GET_ORDER_BY_DATE;
		final HttpHeaders headers = new HttpHeaders();
		headers.set(Constants.AUTHORIZATION, request.getHeader(Constants.AUTHORIZATION));
		final UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(uri)//
				.queryParam("sortOrder", sortOrder)//
				.queryParam("TOP", top)//
				.queryParam("fromDate", fromDate)//
				.queryParam("toDate", toDate);//
		return restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, new HttpEntity<String>(headers),
				OrderRes.class).getBody().getData();
	}

	private Pair<Map<Integer, Long>, Map<Integer, Long>> getRevenuesAndSalesReport() {
		final Calendar from = Calendar.getInstance();
		from.set(Calendar.MONTH, 1);
		from.set(Calendar.DAY_OF_YEAR, 1);
		final Calendar to = Calendar.getInstance();
		to.set(Calendar.MONTH, 11);
		to.set(Calendar.DAY_OF_MONTH, 31);
		final List<OrderVM> orderVMs = getOrderByDateFromRest(
				CommonUtil.convertDateToString(from.getTime(), Constants.DATE_FORMAT_YYYYMMDD_HYPHEN),
				CommonUtil.convertDateToString(to.getTime(), Constants.DATE_FORMAT_YYYYMMDD_HYPHEN), Integer.MAX_VALUE,
				SortType.ascend);
		return Pair.of(
				orderVMs.stream()
						.collect(Collectors.groupingBy(it -> Integer.parseInt(it.getCreatedAt().substring(5, 7)),
								Collectors.summingLong(it -> it.getTotal().longValue()))),
				orderVMs.stream().collect(Collectors
						.groupingBy(it -> Integer.parseInt(it.getCreatedAt().substring(5, 7)), Collectors.counting())));
	}

	private Pair<List<Integer>, List<Integer>> appendDataReport(
			final Pair<Map<Integer, Long>, Map<Integer, Long>> revenuesAndSales) {
		final Map<Integer, Long> left = revenuesAndSales.getLeft();
		final Map<Integer, Long> right = revenuesAndSales.getRight();
		List<Integer> revenues = Lists.newArrayList();
		List<Integer> sales = Lists.newArrayList();
		for (int i = 1; i <= 12; i++) {
			if (left.get(i) == null) {
				revenues.add(0);
			} else {
				revenues.add(left.get(i).intValue());
			}
			if (right.get(i) == null) {
				sales.add(0);
			} else {
				sales.add(right.get(i).intValue());
			}
		}
		return Pair.of(revenues, sales);
	}

}
