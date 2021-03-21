package com.fashion.modules.report.model;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class OrderDetailVM {
	private Integer id;
	private Integer quantity;
	private BigDecimal totalPriceProduct;
	private Integer orderId;
	private Integer productDetailId;
}
