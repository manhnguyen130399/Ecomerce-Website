package com.fashion.modules.product.model;

import java.math.BigDecimal;
import java.util.List;

import com.fashion.commons.enums.CustomerSortType;

import lombok.Data;

@Data
public class ProductFilterRequest {
	private String categoryNames;
	private List<String> colorNames;
	private List<String> sizeNames;
	private List<String> brandNames;
	private List<BigDecimal> prices;
	private String productNames;
	private CustomerSortType sortType;
}
