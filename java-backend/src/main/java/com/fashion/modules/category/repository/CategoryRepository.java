package com.fashion.modules.category.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.category.domain.Category;
import com.fashion.modules.category.model.CategoryEntryMap;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	@Query(value = " SELECT c "
			+ " FROM Category c " 
			+ " LEFT JOIN c.stores st "
			+ " WHERE c.id = :id AND st.id = :storeId ")
	Category findOneByIdAndStoreId(@Param("id") Integer id, @Param("storeId") Integer storeId);
	
	
	@Query(value = " SELECT new com.fashion.modules.category.model.CategoryEntryMap(c.categoryName, COUNT(p.id)) "//
			+ " FROM Category c "//
			+ " LEFT JOIN c.stores st"//
			+ " LEFT JOIN c.products p "//
			+ " WHERE st.id = :storeId "//
			+ " GROUP BY c.id ") //
	List<CategoryEntryMap> getCategoryAndCountProduct(@Param("storeId") Integer storeId);

	@Query(value = " SELECT c "
			+ " FROM Category c " 
			+ " LEFT JOIN c.stores st "
			+ " WHERE st.id = :id ")
	Page<Category> findAllByStoreId(@Param("id")Integer id, Pageable page);
	
	@Query(value = " SELECT c "//
			+ " FROM Category c " //
			+ " LEFT JOIN c.stores st "//
			+ " WHERE st.id = :id "//
			+ " AND c.categoryName LIKE %:keyword% ") //
	Page<Category> searchByKeywordAndStore(@Param("keyword") String keyword, @Param("id") Integer id, Pageable page);

}
