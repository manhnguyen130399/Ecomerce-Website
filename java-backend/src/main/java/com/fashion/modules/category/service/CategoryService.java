package com.fashion.modules.category.service;

import java.util.List;

import com.fashion.modules.category.model.CategoryVM;

public interface CategoryService {

	CategoryVM createCategory(CategoryVM req);

	CategoryVM findById(Integer id);

	List<CategoryVM> findAllByStore();

	void deleteCategory(Integer id);

}
