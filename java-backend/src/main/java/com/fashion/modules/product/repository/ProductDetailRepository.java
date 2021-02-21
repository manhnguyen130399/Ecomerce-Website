package com.fashion.modules.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.product.domain.ProductDetail;

public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {
	
	@Query(" SELECT d "
			+ " FROM ProductDetail d " 
			+ " LEFT JOIN d.product p" 
			+ " LEFT JOIN d.size "
			+ " LEFT JOIN d.color " 
			+ " LEFT JOIN p.brand " 
			+ " WHERE d.id IN (:ids) ")
	List<ProductDetail> getProductDetailByIds(@Param("ids") List<Integer> ids);

}
