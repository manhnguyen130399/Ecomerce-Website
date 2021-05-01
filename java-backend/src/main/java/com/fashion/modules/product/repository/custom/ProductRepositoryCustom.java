package com.fashion.modules.product.repository.custom;

import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;

import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.model.ProductFilterRequest;
import com.fashion.modules.product.model.ProductReq;

public interface ProductRepositoryCustom {

	Page<Product> filterProduct(Integer page, Integer pageSize, Integer storeId, ProductReq req);

	Page<Product> filterProduct(ProductFilterRequest req, Integer page, Integer pageSize);
	
	List<Product> getBestSeller(Integer storeId, Collection<Integer> ids);

}