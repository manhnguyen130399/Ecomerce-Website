package com.fashion.modules.product.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.fashion.commons.enums.SortEnum;
import com.fashion.modules.product.model.ProductReq;
import com.fashion.modules.product.model.ProductRes;
import com.fashion.modules.product.model.ProductVM;

public interface ProductService {

	ProductVM createProduct(ProductReq req);

	ProductVM findById(Integer id);

	ProductVM updateProduct(ProductReq req);

	ProductVM updateImageProduct(List<MultipartFile> files, Integer productId);

	Page<ProductVM> getAllProductByStore(Integer page, Integer pageSize, ProductReq req);

	ProductVM deleteProduct(Integer id,Integer page, Integer pageSize,SortEnum sortOrder, String sortField);

	List<ProductRes> getProductDetailInfos(List<Integer> ids);

	Page<ProductVM> searchProductByKeywordAndStore(String keyword, Integer page, Integer pageSize);

	Page<ProductVM> filterProduct(Integer page, Integer pageSize, ProductReq req);

}
