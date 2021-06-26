package com.fashion.modules.comment.repository;

import java.util.Collection;
import java.util.Date;

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
			+ "	WHERE p.id IN (:productIds)"//
			+ " AND s.id = :storeId "//
			+ " AND c.createdAt BETWEEN :from AND :to ") //
	Integer getCommentInProductIds(@Param("storeId") Integer storeId, @Param("productIds") Collection<Integer> productIds,
			@Param("from") Date from, @Param("to") Date to);

	@Query(" SELECT COUNT (c.id) "//
			+ " FROM Comment c " //
			+ " WHERE c.createdAt BETWEEN :from AND :to ")
	Integer getCommentsFromTo(@Param("from") Date from, @Param("to") Date to);
	
	Comment getCommentByAccountIdAndProductId(Integer accountId, Integer productId);
	

}
