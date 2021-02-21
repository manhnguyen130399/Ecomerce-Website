package com.fashion.modules.complain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.complain.domain.Complain;

public interface ComplainRepository extends JpaRepository<Complain, Integer> {
	
	Complain findOneById(Integer id);
	
	@Query(" SELECT p " 
			+ " FROM Complain p " 
			+ " WHERE p.store.id  = :storeId ")
	Page<Complain> findComplainByStoreId(@Param("storeId") Integer storeId, Pageable page);

}
