package com.fashion.modules.report.web;

import java.util.Map;

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

}
