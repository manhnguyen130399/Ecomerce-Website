package com.fashion.modules.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.category.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
