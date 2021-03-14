package com.fashion.modules.product.model;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import lombok.Data;

@Data
public class ProductReq {

	private Integer id;

	private String productName;

	private BigDecimal price;

	private Integer categoryId;

	private Integer brandId;

	private Set<ProductDetailVM> productDetails;

	private List<String>images;

}
