package com.fashion.modules.blog.model;

import com.fashion.commons.enums.BlogState;

import lombok.Data;

@Data
public class BlogUpdateReq extends BlogReq {
	private BlogState state;
}
