package com.fashion.modules.product.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fashion.modules.product.model.ProductReq;
import com.fashion.modules.product.model.ProductVM;

public interface ProductService {
	
	ProductVM createProduct(ProductReq req);

	ProductVM findById(Integer id);

	ProductVM updateProduct(ProductReq req);

	ProductVM updateImageProduct(List<MultipartFile> files, Integer productId);
	
	List<ProductVM> getAllProductByStore();

	void deleteProduct(Integer id);

}
