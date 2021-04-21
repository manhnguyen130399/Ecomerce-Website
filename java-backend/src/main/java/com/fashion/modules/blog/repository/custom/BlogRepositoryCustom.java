package com.fashion.modules.blog.repository.custom;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.BlogType;
import com.fashion.modules.blog.domain.Blog;

public interface BlogRepositoryCustom {

	Page<Blog> getBlogComple(Integer page, Integer pageSize, BlogType type);

}
