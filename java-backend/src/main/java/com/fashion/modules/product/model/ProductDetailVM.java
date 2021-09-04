package com.fashion.modules.product.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDetailVM implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3076353766157247762L;

	private Integer productDetailId;

	private Integer sizeId;

	private String size;

	private Integer colorId;

	private String color;

	private String colorHex;

	private Integer quantity;

}
