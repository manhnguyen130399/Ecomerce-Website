package com.fashion.modules.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.blog.domain.Blog;

public interface BlogRepository extends JpaRepository<Blog, Integer> {

}
