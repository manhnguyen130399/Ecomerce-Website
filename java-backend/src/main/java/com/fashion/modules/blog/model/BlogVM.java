package com.fashion.modules.blog.model;

import java.util.Date;
import java.util.List;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.BlogState;
import com.fashion.commons.enums.BlogType;
import com.fashion.modules.comment.model.CommentVM;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class BlogVM extends BlogReq {

	private Integer id;

	private String author;

	@JsonFormat(pattern = Constants.DATE_FORMAT_MMDDYYYY_HYPHEN)
	private Date createdAt;
	
	private BlogState state;
	
	private String image;
	
	private BlogType category;
	
	private List<CommentVM> comments;

}
