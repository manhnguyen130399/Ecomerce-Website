package com.fashion.modules.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.comment.domain.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	
	Comment findOneById(Integer id);

}
