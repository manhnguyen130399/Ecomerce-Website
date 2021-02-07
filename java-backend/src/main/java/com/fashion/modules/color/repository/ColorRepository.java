package com.fashion.modules.color.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.color.domain.Color;

public interface ColorRepository extends JpaRepository<Color, Integer> {
	
	@Query(value = " SELECT c " 
					+ " FROM Color c " 
					+ " LEFT JOIN c.stores s " 
					+ " WHERE c.id = :id AND s.id = :storeId")
	Color findOneByIdAndStore(@Param("id") final Integer id, @Param("storeId") final Integer storeId);
	
	
	@Query(value = " SELECT c " 
			+ " FROM Color c " 
			+ " LEFT JOIN c.stores s " 
			+ " WHERE s.id = :id")
	List<Color> findAllByStore(@Param("id") Integer storeId);

}
