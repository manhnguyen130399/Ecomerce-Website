package com.fashion.modules.comment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.comment.domain.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	
	Comment findOneById(Integer id);

	@Query(" SELECT COUNT (c.id) "//
			+ " FROM Comment c " //
			+ " LEFT JOIN c.product p "//
			+ " LEFT JOIN p.store s "//
			+ "	WHERE p.id IN (:productIds) AND s.id =:storeId ") //
	Integer getCommentInProductIds(@Param("storeId") Integer storeId, @Param("productIds") List<Integer> productIds);
	

}
