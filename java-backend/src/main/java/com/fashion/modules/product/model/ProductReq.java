package com.fashion.modules.product.model;

import java.math.BigDecimal;
import java.util.Set;

import com.fashion.modules.product.domain.ProductDetail;
import com.fashion.modules.product.domain.ProductImage;

import lombok.Data;
@Data
public class ProductReq {
	
	private Integer id;

	private String productName;

	private BigDecimal price;
	
	private Integer categoryId;
	
	private Integer brandId;
	
	private Set<ProductDetail> productDetails;

	private Set<ProductImage> productImages;

}
