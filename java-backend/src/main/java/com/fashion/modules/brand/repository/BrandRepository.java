package com.fashion.modules.brand.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.brand.domain.Brand;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
	
	@Query(value = " SELECT b " 
			+ " FROM Brand b " 
			+ " LEFT JOIN b.stores st "
			+ " WHERE b.id = :id AND st.id = :storeId ")
	Brand findOneByIdAndStoreId(@Param("id") Integer id, @Param("storeId") Integer storeId);
	
	@Query(value = " SELECT b "
			+ " FROM Brand b " 
			+ " LEFT JOIN b.stores st "
			+ " WHERE  st.id = :id")
	Page<Brand> findAllByStoreId(@Param("id") Integer id, Pageable page);
	
	@Query(value = " SELECT b "
			+ " FROM Brand b " 
			+ " LEFT JOIN b.stores st "
			+ " WHERE  st.id = :id "
			+ " AND b.brandName LIKE %:keyword% ")
	Page<Brand> searchByKeywordAndStore(@Param("keyword") String keyword, @Param("id") Integer id, Pageable page);
	
	List<Brand> findBrandByIdIn(Collection<Integer> ids);

}
