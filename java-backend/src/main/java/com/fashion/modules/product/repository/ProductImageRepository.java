package com.fashion.modules.product.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.product.domain.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
	
	List<ProductImage> getProductImageByIdIn(Collection<Integer> ids);

}
