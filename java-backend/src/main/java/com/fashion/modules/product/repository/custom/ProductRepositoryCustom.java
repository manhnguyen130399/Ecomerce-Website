package com.fashion.modules.product.repository.custom;

import org.springframework.data.domain.Page;

import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.model.ProductReq;

public interface ProductRepositoryCustom {

	Page<Product> filterProduct(Integer page, Integer pageSize, Integer storeId, ProductReq req);

}