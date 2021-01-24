package com.fashion.modules.product.model;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ProductVM {

	private Integer id;

	private String productName;

	private BigDecimal price;

}
