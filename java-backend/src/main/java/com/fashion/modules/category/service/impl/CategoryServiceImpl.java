package com.fashion.modules.category.service.impl;

import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fashion.commons.enums.SortEnum;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.modules.category.domain.Category;
import com.fashion.modules.category.model.CategoryVM;
import com.fashion.modules.category.repository.CategoryRepository;
import com.fashion.modules.category.service.CategoryService;
import com.fashion.modules.store.domain.Store;
import com.fashion.service.impl.BaseService;

@Service
public class CategoryServiceImpl extends BaseService implements CategoryService {

	@Autowired
	private CategoryRepository cateRepo;

	@Override
	@Transactional
	public CategoryVM createCategory(final CategoryVM req) {
		final Category category = mapper.map(req, Category.class);
		final Store store = getStore(getUserContext());
		final Set<Category> categories = store.getCategories();
		categories.add(category);
		store.setCategories(categories);
		return mapper.map(category, CategoryVM.class);
	}

	@Override
	@Transactional
	public CategoryVM findById(final Integer id) {
		return mapper.map(cateRepo.findOneByIdAndStoreId(id, getStore(getUserContext()).getId()), CategoryVM.class);
	}

	@Override
	@Transactional
	public Page<CategoryVM> findAllByStore(final Integer page, final Integer pageSize, final String categoryName,
			final SortEnum sortOrder, final String sortField) {
		final Pageable pageable = PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField));
		if (StringUtils.isEmpty(categoryName)) {
			return cateRepo.findAllByStoreId(getStore(getUserContext()).getId(), pageable)
					.map(it -> mapper.map(it, CategoryVM.class));
		}
		return searchCategoryByKeywordAndStore(categoryName, sortOrder, sortField, page, pageSize);

	}

	@Override
	@Transactional
	public void deleteCategory(final Integer id) {
		final Store store = getStore(getUserContext());
		final Integer storeId = store.getId();
		final Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
		final Category category = cateRepo.findOneByIdAndStoreId(id, storeId);
		store.setCategories(cateRepo.findAllByStoreId(storeId, pageable).getContent().stream()
				.filter(it -> !it.equals(category)).collect(Collectors.toSet()));

	}

	@Override
	@Transactional
	public Page<CategoryVM> searchCategoryByKeywordAndStore(final String categoryName, final SortEnum sortOrder,
			final String sortField, final Integer page, final Integer pageSize) {
		return cateRepo
				.searchByKeywordAndStore(categoryName, getStore(getUserContext()).getId(),
						PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, CategoryVM.class));
	}

}
