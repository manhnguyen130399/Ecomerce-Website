package com.fashion.service;

import com.fashion.domain.UserContext;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.comment.model.CommentVM;
import com.fashion.modules.store.domain.Store;

public interface IBaseService {
	
	UserContext getUserContext();

	Store getStore(final UserContext context);
	
	Integer getCurrentStoreId();
	
	CommentVM convertToVM (Comment comment);

}
