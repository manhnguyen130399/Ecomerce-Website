package com.fashion.model;

import lombok.Data;

@Data
public class OrderDetailQrVM {

	private String productName;

	private Integer quantity;

	private Integer totalPrice;

}
