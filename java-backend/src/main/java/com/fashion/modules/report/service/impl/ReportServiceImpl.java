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
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
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
import com.fashion.commons.enums.OrderState;
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
import com.fashion.modules.store.model.StoreVM;
import com.fashion.modules.store.service.StoreService;
import com.fashion.service.impl.BaseService;

@Service
public class ReportServiceImpl extends BaseService implements ReportService {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private CategoryRepository cateRepo;

	@Autowired
	private StoreService storeService;

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
			res.setState(new StateOrderReportVM(getOrderStateNumber(OrderState.COMPLETE, orders, total),
					getOrderStateNumber(OrderState.CANCEL, orders, total),
					getOrderStateNumber(OrderState.PENDING, orders, total),
					getOrderStateNumber(OrderState.DELIVER, orders, total)));
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

	private Integer getOrderStateNumber(final OrderState type, final List<OrderVM> orders, final Integer total) {
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

	@Override
	public Pair<Workbook, String> getOrderReport(final String fromDate, final String toDate, final Integer top) {
		final ReportRes res = getOrderByDate(fromDate, toDate, top, SortType.ascend);
		res.getRevenue();
		final Workbook wb = new HSSFWorkbook();
		final StoreVM store = storeService.getStore(getCurrentStoreId());
		final Sheet sheet = wb.createSheet(Constants.ORDER_REPORT);
		final Row firstRow = sheet.createRow(0);
		firstRow.createCell(0, CellType.STRING).setCellValue(Constants.OWNER);
		firstRow.createCell(1, CellType.STRING).setCellValue(store.getOwner());
		firstRow.createCell(2, CellType.STRING).setCellValue(Constants.CURRENT_REVENUE_OF_MONTH);
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 6));
		firstRow.createCell(7, CellType.NUMERIC).setCellValue(res.getRevenue().doubleValue());
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 7, 9));
		final Cell orderTitle = sheet.createRow(1).createCell(0);
		orderTitle.setCellValue(Constants.ORDER_REPORT);
		orderTitle.getCellStyle().setAlignment(HorizontalAlignment.CENTER);
		fontCell(orderTitle.getCellStyle(), wb);
		sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, 11));
		final CellStyle cellStyle = cellStyle(wb);
		buildHeader(sheet.createRow(2), cellStyle);
		appendRevenues(res, sheet.createRow(3), cellStyle);
		final Cell saleTitle = sheet.createRow(4).createCell(0);
		saleTitle.setCellValue(Constants.SALE);
		saleTitle.getCellStyle().setAlignment(HorizontalAlignment.CENTER);
		fontCell(saleTitle.getCellStyle(), wb);
		sheet.addMergedRegion(new CellRangeAddress(4, 4, 0, 11));
		appendSales(res, sheet.createRow(5), cellStyle);
		return Pair.of(wb, store.getStoreName());
	}

	private CellStyle cellStyle(final Workbook wb) {
		final CellStyle cellStyle = wb.createCellStyle();
		cellStyle.setBorderBottom(BorderStyle.THIN);
		cellStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
		cellStyle.setBorderRight(BorderStyle.THIN);
		cellStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
		cellStyle.setBorderTop(BorderStyle.THIN);
		cellStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
		cellStyle.setBorderLeft(BorderStyle.THIN);
		cellStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
		return cellStyle;
	}

	private void appendSales(final ReportRes res, final Row row, final CellStyle cellStyle) {
		for (int i = 0; i < res.getSales().size(); i++) {
			final Cell cell = row.createCell(i, CellType.NUMERIC);
			cell.setCellValue(res.getSales().get(i));
			cell.setCellStyle(cellStyle);
		}
	}

	private void appendRevenues(final ReportRes res, final Row thirdRow, final CellStyle cellStyle) {
		final List<Integer> revenues = res.getRevenues();
		for (int i = 0; i < revenues.size(); i++) {
			final Cell cell = thirdRow.createCell(i, CellType.NUMERIC);
			cell.setCellValue(revenues.get(i));
			cell.setCellStyle(cellStyle);
		}
	}

	private void buildHeader(final Row secondRow, final CellStyle cellStyle) {
		final List<String> months = Lists.newArrayList("Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug",
				"Step", "Oct", "Nov", "Dec");
		for (int i = 0; i < months.size(); i++) {
			final Cell cell = secondRow.createCell(i, CellType.STRING);
			cell.setCellValue(months.get(i));
			cell.setCellStyle(cellStyle);
			cell.getCellStyle().setAlignment(HorizontalAlignment.CENTER);
			cell.getCellStyle().setFillForegroundColor(IndexedColors.GREY_50_PERCENT.index);

		}
	}

	private void fontCell(final CellStyle cellStyle, final Workbook wb) {
		final Font font = wb.createFont();
		font.setFontName(HSSFFont.FONT_ARIAL);
		font.setFontHeightInPoints((short) 15);
		font.setBold(true);
		cellStyle.setFont(font);
	}

}
