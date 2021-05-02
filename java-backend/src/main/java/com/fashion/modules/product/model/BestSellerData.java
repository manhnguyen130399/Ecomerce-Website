package com.fashion.modules.product.model;

import java.util.List;

import lombok.Data;

@Data
public class BestSellerData {
	private List<ProductBestSeller> productDetails;
	private List<OrderState> states;
}
