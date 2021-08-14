package com.fashion.modules.product.model;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Data;

@Data
public class ProductRes implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer productId;

	private Integer productDetailId;

	private String productName;

	private BigDecimal price;

	private String sizeName;

	private String colorName;

	private String colorHex;

	private String brandName;

	private String categoryName;

	private Integer quantity;
	
	private Integer storeId;
	
	private String image;
}
