package com.fashion.modules.category.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.category.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	@Query(value = " SELECT c "
			+ " FROM Category c " 
			+ " LEFT JOIN c.stores st "
			+ " WHERE c.id = :id AND st.id = :storeId ")
	Category findOneByIdAndStoreId(@Param("id") Integer id, @Param("storeId") Integer storeId);
	
	
	@Query(value = " SELECT c "
			+ " FROM Category c " 
			+ " LEFT JOIN c.stores st "
			+ " WHERE st.id = :id ")
	List<Category> findAllByStoreId(@Param("id")Integer id);

}
