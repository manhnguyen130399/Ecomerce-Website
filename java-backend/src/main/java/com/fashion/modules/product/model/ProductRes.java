package com.fashion.modules.product.model;

import java.math.BigDecimal;

import lombok.Data;
@Data
public class ProductRes {

	private Integer productId;

	private Integer productDetailId;

	private String productName;

	private BigDecimal price;

	private String sizeName;

	private String colorName;

	private String brandName;

	private String categoryName;

	private Integer quantity;
}
