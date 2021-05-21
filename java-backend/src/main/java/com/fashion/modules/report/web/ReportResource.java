package com.fashion.modules.report.web;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.tuple.Pair;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fashion.commons.enums.SortType;
import com.fashion.modules.report.service.ReportService;
import com.fashion.web.BaseResource;
@Controller
@RequestMapping(path = { "/api" })
public class ReportResource extends BaseResource {

	public final String URL = "/report";

	@Autowired
	private ReportService reportService;

	@GetMapping(URL + "/by-date")
	public ResponseEntity<Map<String, Object>> getReportOrder(
			@RequestParam(required = false) final  String fromDate,
			@RequestParam(required = false) final String toDate,
			@RequestParam(required = false, defaultValue = "10") final Integer top,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder) {
		return success(reportService.getOrderByDate(fromDate, toDate, top, sortOrder));
	}
	
	@GetMapping(URL + "/export-excel")
	public void exportPotentialInteractionReport(@RequestParam(required = false) final String fromDate,
			@RequestParam(required = false) final String toDate,
			@RequestParam(required = false, defaultValue = "10") final Integer top, final HttpServletResponse response)
			throws IOException {
		final Pair<Workbook, String> orderReport = reportService.getOrderReport(fromDate, toDate, top);
		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename=" + orderReport.getRight() + ".xls");
		final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		orderReport.getLeft().write(outputStream);
		final ByteArrayInputStream stream = new ByteArrayInputStream(outputStream.toByteArray());
		IOUtils.copy(stream, response.getOutputStream());
	}

}
