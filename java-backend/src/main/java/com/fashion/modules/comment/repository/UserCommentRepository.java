package com.fashion.modules.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.comment.domain.UserComment;
import com.fashion.modules.comment.domain.UserLikeCommentId;

public interface UserCommentRepository extends JpaRepository<UserComment, UserLikeCommentId> {

	UserComment findByUserLikeCommentId(UserLikeCommentId id);

}
