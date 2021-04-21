package com.fashion.modules.blog.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.blog.domain.Blog;
import com.fashion.modules.blog.repository.custom.BlogRepositoryCustom;

public interface BlogRepository extends BlogRepositoryCustom, JpaRepository<Blog, Integer> {

	@Query(" SELECT b "//
			+ " FROM Blog b "//
			+ " LEFT JOIN FETCH b.comments "//
			+ " WHERE b.id = :id ") //
	Blog findOneById(@Param("id") Integer id);

	@Query(" SELECT b "//
			+ " FROM Blog b "//
			+ " WHERE b.title LIKE %:title% ") //
	Page<Blog> findAllByTitleLike(@Param("title") String title, Pageable page);

}
