package com.fashion.modules.blog.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.BlogState;
import com.fashion.commons.enums.SortType;
import com.fashion.modules.blog.model.BlogReq;
import com.fashion.modules.blog.model.BlogUpdateReq;
import com.fashion.modules.blog.model.BlogVM;

public interface BlogService {

	BlogVM createBlog(BlogReq req);

	BlogVM getBlogById(Integer id);

	Page<BlogVM> getAllBlog(Integer page, Integer pageSize, SortType sortOrder, String sortField, String title);

	BlogVM deleteBlog(Integer id, Integer page, Integer pageSize, SortType sortOrder, String sortField, String title);

	BlogVM updateBlog(Integer id, BlogUpdateReq req);

	List<BlogState> getBlogStates();

}
