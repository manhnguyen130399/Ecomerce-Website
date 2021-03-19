package com.fashion.model;

import java.math.BigDecimal;
import java.util.List;

import com.fashion.commons.enums.OrderType;

import lombok.Data;

@Data
public class OrderQrVM {

	private String customerName;

	private String address;

	private String email;

	private String phone;

	private BigDecimal total;
	
	private OrderType state;

	private List<OrderDetailQrVM> orderDetails;

}
