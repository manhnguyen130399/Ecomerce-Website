package com.fashion.modules.product.model;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import com.fashion.model.BaseReq;

import lombok.Data;

@Data
public class ProductReq extends BaseReq {

	private Integer id;

	private String productName;

	private BigDecimal price;

	private Integer categoryId;

	private Integer brandId;

	private String brandName;

	private String categoryName;

	private Set<ProductDetailVM> productDetails;

	private List<String> images;

}
