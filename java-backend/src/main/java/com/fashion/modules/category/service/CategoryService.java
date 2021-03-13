package com.fashion.modules.category.service;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.SortEnum;
import com.fashion.modules.category.model.CategoryVM;

public interface CategoryService {

	CategoryVM createCategory(CategoryVM req);

	CategoryVM findById(Integer id);

	Page<CategoryVM> findAllByStore(Integer page, Integer pageSize, String brandName, SortEnum sortOrder,
			String sortField);

	void deleteCategory(Integer id);

	Page<CategoryVM> searchCategoryByKeywordAndStore(String brandName, SortEnum sortOrder, String sortField,
			Integer page, Integer pageSize);

}
