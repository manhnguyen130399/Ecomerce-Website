package com.fashion.modules.blog.model;

import java.util.List;

import lombok.Data;

@Data
public class BlogRes {

	List<BlogVM> blogRecents;

	List<String> categories;

}
