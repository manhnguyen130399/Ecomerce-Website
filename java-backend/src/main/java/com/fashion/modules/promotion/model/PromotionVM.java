package com.fashion.modules.promotion.model;

import com.fashion.modules.store.model.StoreVM;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class PromotionVM extends PromotionRequest {

	private Integer id;

	private String qrCode;

	private StoreVM store;

	public Integer getId() {
		return id;
	}

	public void setId(final Integer id) {
		this.id = id;
	}

	@JsonIgnore
	public StoreVM getStore() {
		return store;
	}

	public void setStore(final StoreVM store) {
		this.store = store;
	}

	public String getQrCode() {
		return qrCode;
	}

	public void setQrCode(final String qrCode) {
		this.qrCode = qrCode;
	}

}
