package com.fashion.modules.blog.model;

import com.fashion.commons.enums.BlogType;

import lombok.Data;

@Data
public class BlogReq {

	private String title;

	private String content;

	private String summary;

	private String image;

	private BlogType category;
}
