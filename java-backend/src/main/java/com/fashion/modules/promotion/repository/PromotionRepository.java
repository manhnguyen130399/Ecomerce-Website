package com.fashion.modules.promotion.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.promotion.domain.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
	
	Promotion findOneById(Integer id);
	
	@Query(" SELECT p " 
			+ " FROM Promotion p " 
			+ " WHERE p.store.id = :storeId")
	List<Promotion> findAllByStore(@Param("storeId") Integer storeId);
	
	@Query(" SELECT p " 
			+ " FROM Promotion p " 
			+ " WHERE p.startDate = :date")
	List<Promotion> findPromotionValidDate(@Param("date") Date date);
	
	
}
