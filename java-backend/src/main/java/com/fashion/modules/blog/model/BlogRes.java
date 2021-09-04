package com.fashion.modules.blog.model;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class BlogRes implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	List<BlogVM> blogRecents;

	List<String> categories;

}
