package com.fashion.modules.size.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.size.domain.Size;

public interface SizeRepository extends JpaRepository<Size, Integer> {

	@Query(value = " SELECT s " 
			+ " FROM Size s " 
			+ " LEFT JOIN s.stores st " 
			+ " WHERE s.id =:id AND st.id = :storeId ")
	Size findOneByIdAndStoreId(@Param("id") final Integer id, @Param("storeId") final Integer storeId);
	
	
	@Query(value = " SELECT s " 
			+ " FROM Size s " 
			+ " LEFT JOIN s.stores st " 
			+ " WHERE st.id = :id ")
	List<Size> findAllByStoreId(@Param("id") Integer id);

}
