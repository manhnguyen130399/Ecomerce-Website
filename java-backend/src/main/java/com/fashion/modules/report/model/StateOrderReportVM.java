package com.fashion.modules.report.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StateOrderReportVM {
	private Integer complete;
	private Integer cancle;
	private Integer pending;
	private Integer delivery;

}
