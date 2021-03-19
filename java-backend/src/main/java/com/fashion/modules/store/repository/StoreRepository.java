package com.fashion.modules.store.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.store.domain.Store;

public interface StoreRepository extends JpaRepository<Store, Integer> {

	@Query(value = " SELECT s "
			+ " FROM Store s " 
			+ " LEFT JOIN FETCH s.colors " 
			+ " LEFT JOIN FETCH s.sizes "
			+ " LEFT JOIN FETCH s.categories "
			+ " WHERE s.id = :id ")
	Store findOneById(@Param("id") Integer id);
	
	Store findByStoreNameLike(String storeName);
	
	Store findByStoreName(String storeName);
	
	@Query(value = " SELECT s " 
			+ " FROM Store s " 
			+ " WHERE s.id IN (:ids) ")
	List<Store> getStoreByIds(@Param("ids") List<Integer> ids);
	
	@Query(value = " SELECT s " //
			+ " FROM Store s "//
			+ " WHERE s.storeName LIKE %:keyword% "//
			+ " OR s.address LIKE %:keyword% "//
			+ " OR s.owner LIKE %:keyword% "//
			+ " OR s.website LIKE %:keyword% ")//
	Page<Store> seachStoreByKeyWord(@Param("keyword") String keyword, Pageable page);

}
