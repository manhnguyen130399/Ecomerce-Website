package com.fashion.modules.comment.model;

import lombok.Data;

@Data
public class CommentReq {
	
	private String content;
	
	private Integer productId;
	
	private Integer blogId;

}
