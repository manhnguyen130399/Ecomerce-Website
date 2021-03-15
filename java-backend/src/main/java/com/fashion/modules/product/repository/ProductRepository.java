package com.fashion.modules.product.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.repository.custom.ProductRepositoryCustom;

public interface ProductRepository extends ProductRepositoryCustom, JpaRepository<Product, Integer> {
	
	
	@Query(" SELECT p " 
			+ " FROM Product p " 
			+ " LEFT JOIN FETCH p.productDetails "
			+ " LEFT JOIN FETCH p.productImages "
			+ " LEFT JOIN FETCH p.comments "
			+ " WHERE p.id = :id AND p.store.id = :storeId ")
	Product findOneProductByIdAndStore(@Param("id") Integer id, @Param("storeId") Integer storeId);
	
	@Query(" SELECT p " 
			+ " FROM Product p " 
//			+ " LEFT JOIN FETCH p.productDetails "
//			+ " LEFT JOIN FETCH p.productImages "
//			+ " LEFT JOIN FETCH p.comments "
			+ " WHERE p.store.id = :storeId ")
	Page<Product> findAllProductStore(@Param("storeId") Integer storeId, Pageable page);
	
	@Query(" SELECT p " 
			+ " FROM Product p "
			+ " LEFT JOIN p.category cate "
			+ " LEFT JOIN p.brand brand "
			+ " WHERE p.store.id = :storeId "
			+ " AND p.productName LIKE %:keyword% "
			+ " OR p.price LIKE %:keyword% "
			+ " OR cate.categoryName LIKE %:keyword% "
			+ " OR brand.brandName LIKE %:keyword% " )
	Page<Product> searchByKeywordAndStore(@Param("keyword") String keyword, @Param("storeId") Integer storeId,
			Pageable page);

}
