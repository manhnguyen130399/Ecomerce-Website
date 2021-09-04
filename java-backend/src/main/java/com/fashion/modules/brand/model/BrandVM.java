package com.fashion.modules.brand.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class BrandVM implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7622595682094824739L;

	private Integer id;

	private String brandName;

	public BrandVM(final Integer id, final String brandName) {
		super();
		this.id = id;
		this.brandName = brandName;
	}

	public BrandVM() {
		super();
	}

	public BrandVM(final String brandName) {
		super();
		this.brandName = brandName;
	}

}
