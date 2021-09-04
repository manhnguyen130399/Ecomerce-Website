package com.fashion.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import com.fashion.commons.enums.OrderState;

import lombok.Data;

@Data
public class OrderQrVM implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7357097940086245952L;

	private String customerName;

	private String address;

	private String email;

	private String phone;

	private BigDecimal total;
	
	private OrderState state;

	private List<OrderDetailQrVM> orderDetails;

}
