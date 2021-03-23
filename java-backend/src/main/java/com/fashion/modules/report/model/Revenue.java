package com.fashion.modules.report.model;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Revenue {
	private BigDecimal revenue;
	private Integer orders;
}
