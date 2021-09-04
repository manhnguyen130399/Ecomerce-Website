package com.fashion.modules.product.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageVM implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6142334028990929624L;

	private Integer id;
	
	private String image;

}
