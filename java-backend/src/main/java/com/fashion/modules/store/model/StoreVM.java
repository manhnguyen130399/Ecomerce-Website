package com.fashion.modules.store.model;

import java.sql.Time;

import lombok.Data;

@Data
public class StoreVM {
	
	private Integer id;

	private String storeName;

	private String address;
	
	private String owner;

	private Time openTime;

	private Time closeTime;

}
