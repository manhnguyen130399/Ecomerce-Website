package com.fashion.modules.size.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	
	@Query(value = " SELECT s " //
			+ " FROM Size s " //
			+ " LEFT JOIN s.stores st "//
			+ " WHERE s.id IN (:ids) AND st.id = :storeId ")
	List<Size> findByIdInAndStoreId(@Param("ids") final Collection<Integer> id, @Param("storeId") final Integer storeId);
	
	@Query(value = " SELECT s " 
			+ " FROM Size s " 
			+ " LEFT JOIN s.stores st " 
			+ " WHERE st.id = :id ")
	Page<Size> findAllByStoreId(@Param("id") Integer id, Pageable page);
	
	Size getBySizeName(String sizeName);

	@Query(value = " SELECT s "//
			+ " FROM Size s "//
			+ " LEFT JOIN s.stores st "//
			+ " WHERE s.sizeName LIKE %:keyword% "//
			+ " AND st.id = :id ") //
	Page<Size> searchSizeByKeyword(@Param("keyword") String keyword, Integer id, Pageable page);

	Page<Size> getBySizeNameLike(String sizeName, Pageable pageable);
}
