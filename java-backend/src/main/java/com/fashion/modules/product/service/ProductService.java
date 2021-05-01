package com.fashion.modules.product.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.fashion.commons.enums.SortType;
import com.fashion.modules.product.model.ProductFilterRequest;
import com.fashion.modules.product.model.ProductReq;
import com.fashion.modules.product.model.ProductRes;
import com.fashion.modules.product.model.ProductVM;

public interface ProductService {

	ProductVM createProduct(ProductReq req);

	ProductVM findById(Integer id);

	ProductVM updateProduct(ProductReq req);

	String deleteImageProduct(Integer productImageId);

	Page<ProductVM> getAllProductByStore(Integer page, Integer pageSize, ProductReq req);

	ProductVM deleteProduct(Integer id, Integer page, Integer pageSize, SortType sortOrder, String sortField);

	List<ProductRes> getProductDetailInfos(List<Integer> ids);

	Page<ProductVM> searchProductByKeywordAndStore(String keyword, Integer page, Integer pageSize);

	Page<ProductVM> filterProduct(Integer page, Integer pageSize, ProductReq req);

	List<ProductRes> readExcelFile(MultipartFile file);

	List<ProductVM> createProducts(List<ProductRes> products);
	
	Page<ProductVM> getAllOrFilterProduct(ProductFilterRequest req, Integer page, Integer pageSize);
	
	List<ProductVM> getBestSellerProductByStore(Integer storeId);
	
	Page<ProductVM> searchProductByKeyword(Integer page, Integer pageSize, String keyword);

}
