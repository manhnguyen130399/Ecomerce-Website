package com.fashion.modules.product.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import com.fashion.modules.comment.model.CommentVM;

import lombok.Data;

@Data
public class ProductVM implements Serializable{

	private static final long serialVersionUID = 1L;

	private Integer id;

	private String productName;

	private BigDecimal price;

	private Integer categoryId;

	private String categoryName;

	private Integer brandId;

	private String brandName;
	
	private String description;

	private Set<ProductDetailVM> productDetails;

	private Set<ProductImageVM> productImages;

	private List<CommentVM> comments;

	private Integer storeId;
}
