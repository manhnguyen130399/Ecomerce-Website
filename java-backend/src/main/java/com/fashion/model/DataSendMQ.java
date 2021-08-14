package com.fashion.model;

import java.io.Serializable;
import java.util.List;

import com.fashion.modules.product.model.ProductRes;
import com.fasterxml.jackson.databind.PropertyNamingStrategy.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(value = SnakeCaseStrategy.class)
public class DataSendMQ implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<ProductRes> productVMs;
	
	public DataSendMQ(final List<ProductRes> productVMs) {
		super();
		this.productVMs = productVMs;
	}

	public DataSendMQ() {
		super();
	}

	public List<ProductRes> getProductVMs() {
		return productVMs;
	}

	public void setProductVMs(List<ProductRes> productVMs) {
		this.productVMs = productVMs;
	}
	

}
