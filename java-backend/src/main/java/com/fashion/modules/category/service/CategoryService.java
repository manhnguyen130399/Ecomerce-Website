package com.fashion.modules.category.service;

import java.util.Set;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.SortType;
import com.fashion.modules.category.model.CategoryVM;

public interface CategoryService {

	CategoryVM createCategory(CategoryVM req);

	CategoryVM findById(Integer id);

	Page<CategoryVM> findAllByStore(Integer page, Integer pageSize, String categoryName, SortType sortOrder,
			String sortField, Integer storeId);

	CategoryVM deleteCategory(Integer id, Integer page, Integer pageSize, String categoryName, SortType sortOrder,
			String sortField);

	Page<CategoryVM> searchCategoryByKeywordAndStore(String categoryName, SortType sortOrder, String sortField,
			Integer page, Integer pageSize, Integer storeId);

	Set<CategoryVM> getAll();

}
