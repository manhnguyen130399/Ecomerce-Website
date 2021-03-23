package com.fashion.modules.report.model;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.fashion.modules.category.model.CategoryEntryMap;

import lombok.Data;

@Data
public class ReportRes {
	private BigDecimal revenue;
	private Integer order;
	private Integer reviews;
	private Integer customer;
	private List<CategoryEntryMap> category;
	private StateOrderReportVM state;
	private Map<String, Long> revenues;
	private Map<String, Integer> sales;
}
