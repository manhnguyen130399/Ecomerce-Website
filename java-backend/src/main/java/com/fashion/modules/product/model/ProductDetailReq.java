package com.fashion.modules.product.model;

import java.math.BigDecimal;

import javax.annotation.Nonnull;

import lombok.Data;
@Data
public class ProductDetailReq {
	@Nonnull
	private Integer ProductDetailID;
	@Nonnull
	private Integer Quantity;
	private BigDecimal Price;
}
