package com.fashion.modules.blog.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fashion.commons.constants.Constants;

import lombok.Data;

@Data
public class BlogVM extends BlogReq {

	private Integer id;

	private String author;

	@DateTimeFormat(pattern = Constants.DATE_FORMAT_DDMMYYYY_HYPHEN)
	private Date createdAt;

}
