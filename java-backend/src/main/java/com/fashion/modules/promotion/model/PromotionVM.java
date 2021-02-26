package com.fashion.modules.promotion.model;

import com.fashion.modules.store.model.StoreVM;

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
