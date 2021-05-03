package com.fashion.modules.wishlist.service;

import org.springframework.data.domain.Page;

import com.fashion.modules.product.model.ProductVM;

public interface WishListService {

	ProductVM create(Integer productId);
	
	void delete(Integer productId);
	
	Page<ProductVM> getProductWishList(Integer page, Integer pageSize);

}
