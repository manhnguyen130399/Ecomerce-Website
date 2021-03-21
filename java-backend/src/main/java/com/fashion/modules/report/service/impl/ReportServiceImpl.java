package com.fashion.modules.report.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.constants.RestURL;
import com.fashion.commons.enums.OrderType;
import com.fashion.commons.enums.SortType;
import com.fashion.modules.category.service.CategoryService;
import com.fashion.modules.comment.repository.CommentRepository;
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
	private CategoryService categoryService;

	@Autowired
	private ProductDetailRepository productDetailRepo;

	@Autowired
	private CommentRepository commentRepo;

	@Override
	public ReportRes getOrderByDate(final String fromDate, final String toDate, final Integer top,
			final SortType sortOrder) {
		final List<OrderVM> orders = getOrderByDateFromRest(fromDate, toDate, top, sortOrder);
		final List<Integer> productDetailIds = orders.parallelStream()
				.flatMap(it -> it.getOrderDetails().stream().map(i -> i.getProductDetailId()))
				.collect(Collectors.toList());
		final List<Integer> productId = productDetailRepo.getProductDetailByIds(productDetailIds).parallelStream()
				.map(it -> it.getProduct().getId()).collect(Collectors.toList());
		final ReportRes res = new ReportRes();
		res.setCategory(
				categoryService.findAllByStore(0, 50, StringUtils.EMPTY, sortOrder, Constants.FIELD_ID).getContent());
		int total = orders.size();
		res.setOrder(total);
		res.setRevenue(orders.parallelStream().map(it -> it.getTotal()).findAny().get());
		res.setCustomer(orders.size());
		res.setReviews(commentRepo.getCommentInProductIds(getCurrentStoreId(), productId));
		res.setState(new StateOrderReportVM(getOrderStateNumber(OrderType.COMPLETE, orders, total),
				getOrderStateNumber(OrderType.CANCLE, orders, total),
				getOrderStateNumber(OrderType.PENDING, orders, total),
				getOrderStateNumber(OrderType.DELIVER, orders, total)));
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

}
