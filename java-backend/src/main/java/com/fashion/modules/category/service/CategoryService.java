package com.fashion.modules.category.service;

import org.springframework.data.domain.Page;

import com.fashion.modules.category.model.CategoryVM;

public interface CategoryService {

	CategoryVM createCategory(CategoryVM req);

	CategoryVM findById(Integer id);

	Page<CategoryVM> findAllByStore(Integer page, Integer pageSize);

	void deleteCategory(Integer id);

}
