package com.fashion.modules.comment.service;

import com.fashion.modules.comment.model.CommentReq;
import com.fashion.modules.comment.model.CommentVM;

public interface CommentService {

	CommentVM createComment(CommentReq req);

	CommentVM updateComment(String content, Integer id);

	void deleteComment(Integer id);

	CommentVM likeComment(Integer id, boolean isLike, int time);

}
