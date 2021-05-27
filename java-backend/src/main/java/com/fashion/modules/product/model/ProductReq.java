package com.fashion.modules.product.model;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import com.fashion.commons.enums.SortType;
import com.fashion.model.BaseReq;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductReq extends BaseReq {

	private Integer storeId;
	
	private Integer id;

	private String productName;

	private BigDecimal price;

	private Integer categoryId;

	private Integer brandId;

	private String brandName;

	private String categoryName;
	
	private String description;

	private Set<ProductDetailVM> productDetails;

	private List<String> images;

	public ProductReq(final SortType sortOrder, final String sortField) {
		super(sortOrder, sortField);
	}
	
	
	

}
