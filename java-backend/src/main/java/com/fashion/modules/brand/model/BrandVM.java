package com.fashion.modules.brand.model;

import lombok.Data;

@Data
public class BrandVM {

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
