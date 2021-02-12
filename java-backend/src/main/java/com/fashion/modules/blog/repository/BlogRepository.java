package com.fashion.modules.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.blog.domain.Blog;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
	
	@Query( " SELECT b "
			+ " FROM Blog b "
			+ " WHERE b.id = :id AND b.store.id = :storeId ")
	Blog findOneByIdAndStoreId(@Param("id") Integer id, @Param("storeId") Integer storeId);

}
