package com.fashion.modules.comment.model;

import java.util.Date;

import lombok.Data;

@Data
public class CommentVM {
	
	private Integer id;
	
	private String content;
	
	private String email;
	
	private Integer productId;
	
	private Integer blogId;
	
	private Date createdAt;
	
	private Integer like;

}
