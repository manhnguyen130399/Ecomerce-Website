package com.fashion.modules.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.product.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	
	@Query(" SELECT p " 
			+ " FROM Product p " 
			+ " LEFT JOIN FETCH p.productDetails "
			+ " LEFT JOIN FETCH p.productImages "
			+ " LEFT JOIN FETCH p.comments "
			+ " WHERE p.id = :id AND p.store.id = :storeId ")
	Product findOneProductByIdAndStore(@Param("id") Integer id, @Param("storeId") Integer storeId);
	
	@Query(" SELECT p " 
			+ " FROM Product p " 
			+ " LEFT JOIN FETCH p.productDetails "
			+ " LEFT JOIN FETCH p.productImages "
			+ " WHERE p.store.id = :storeId ")
	List<Product> findAllProductStore(@Param("storeId") Integer storeId);

}
