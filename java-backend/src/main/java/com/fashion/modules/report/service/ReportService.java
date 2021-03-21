package com.fashion.modules.report.service;

import com.fashion.commons.enums.SortType;
import com.fashion.modules.report.model.ReportRes;

public interface ReportService {

	ReportRes getOrderByDate(String fromDate, String toDate, Integer top, SortType sortOrder);
}
