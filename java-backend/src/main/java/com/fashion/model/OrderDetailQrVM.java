package com.fashion.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class OrderDetailQrVM implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7060612908371575592L;

	private String productName;

	private Integer quantity;

	private Integer totalPriceProduct;

}
