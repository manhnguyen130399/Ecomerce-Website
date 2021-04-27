package com.fashion.modules.product.model;

import lombok.Data;

@Data
public class OrderState {
	private com.fashion.commons.enums.OrderState state;
	private Integer quantity;
}
