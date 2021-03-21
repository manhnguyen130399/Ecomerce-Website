package com.fashion.modules.report.model;

import java.math.BigDecimal;
import java.util.List;

import com.fashion.modules.category.model.CategoryVM;

import lombok.Data;

@Data
public class ReportRes {
	private BigDecimal revenue;
	private Integer order;
	private Integer reviews;
	private Integer customer;
	private List<CategoryVM> category;
	private StateOrderReportVM state;
}
