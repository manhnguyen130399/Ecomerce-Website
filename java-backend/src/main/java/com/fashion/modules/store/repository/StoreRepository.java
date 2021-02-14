package com.fashion.modules.store.repository;

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

}
