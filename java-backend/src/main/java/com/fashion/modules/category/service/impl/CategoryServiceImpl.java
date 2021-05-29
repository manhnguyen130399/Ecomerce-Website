package com.fashion.modules.category.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.SortType;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.domain.UserContext;
import com.fashion.modules.category.domain.Category;
import com.fashion.modules.category.model.CategoryVM;
import com.fashion.modules.category.repository.CategoryRepository;
import com.fashion.modules.category.service.CategoryService;
import com.fashion.modules.store.domain.Store;
import com.fashion.service.impl.BaseService;
import com.google.common.collect.Iterables;

@Service
public class CategoryServiceImpl extends BaseService implements CategoryService {

	@Autowired
	private CategoryRepository cateRepo;

	@Override
	@Transactional
	@CacheEvict(value = Constants.CATEGORIES)
	public CategoryVM createCategory(final CategoryVM req) {
		final Store store = getStore(getUserContext());
		final Category existed = cateRepo.getByCategoryName(req.getCategoryName());
		final boolean hasCategory = existed != null;
		final Category category = hasCategory ? existed : mapper.map(req, Category.class);
		if (hasCategory && store.getCategories().contains(category)) {
			return mapper.map(category, CategoryVM.class);
		}
		final Set<Store> stores = category.getStores();
		stores.add(store);
		category.setStores(stores);
		if (!hasCategory) {
			category.setCreatedBy(getUserContext().getUsername());
			category.setImage(req.getImage());
			cateRepo.save(category);
		}
		return mapper.map(category, CategoryVM.class);
	}

	@Override
	@Transactional
	public CategoryVM findById(final Integer id) {
		return mapper.map(cateRepo.findOneByIdAndStoreId(id, getCurrentStoreId()), CategoryVM.class);
	}

	@Override
	@Transactional
	public Page<CategoryVM> getCategories(final Integer page, final Integer pageSize, final String categoryName,
			final SortType sortOrder, final String sortField, final Integer storeId) {
		final Pageable pageable = PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField));
		return !isAdmin() ? getCategoriesSeller(page, pageSize, categoryName, sortOrder, sortField, storeId, pageable)
				: getCategoriesByAdmin(categoryName, pageable);
	}

	private Page<CategoryVM> getCategoriesByAdmin(final String categoryName, final Pageable pageable) {
		return StringUtils.isEmpty(categoryName)
				? cateRepo.findAll(pageable).map(it -> mapper.map(it, CategoryVM.class))
				: cateRepo.getByCategoryNameLike(CommonUtil.customLikeValueVariable(categoryName), pageable)
						.map(it -> mapper.map(it, CategoryVM.class));
	}

	private Page<CategoryVM> getCategoriesSeller(final Integer page, final Integer pageSize, final String categoryName,
			final SortType sortOrder, final String sortField, final Integer storeId, final Pageable pageable) {
		if (StringUtils.isEmpty(categoryName)) {
			return cateRepo.findAllByStoreId(storeId != 0 ? storeId : getCurrentStoreId(), pageable)
					.map(it -> mapper.map(it, CategoryVM.class));
		}
		return searchCategoryByKeywordAndStore(categoryName, sortOrder, sortField, page, pageSize, storeId);
	}

	@Override
	@Transactional
	@CacheEvict(value = Constants.CATEGORIES, allEntries = true)
	public CategoryVM deleteCategory(final Integer id, final Integer page, final Integer pageSize,
			final String categoryName, final SortType sortOrder, final String sortField) {
		final Store store = getStore(getUserContext());
		final Integer storeId = store != null ? store.getId() : 0;
		if (!isAdmin()) {
			final Category category = cateRepo.findOneByIdAndStoreId(id, storeId);
			category.getStores().remove(store);
		} else {
			cateRepo.deleteById(id);
		}
		final List<CategoryVM> content = getCategories(page, pageSize, categoryName, sortOrder, sortField, storeId)
				.getContent();
		if (CollectionUtils.isEmpty(content)) {
			return null;
		}
		final CategoryVM last = Iterables.getLast(content);
		return last.getId() != id ? last : null;

	}

	@Override
	@Transactional
	@Cacheable(value = Constants.CATEGORIES)
	public Page<CategoryVM> searchCategoryByKeywordAndStore(final String categoryName, final SortType sortOrder,
			final String sortField, final Integer page, final Integer pageSize, final Integer storeId) {
		return cateRepo
				.searchByKeywordAndStore(categoryName, storeId != 0 ? storeId : getCurrentStoreId(),
						PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, CategoryVM.class));
	}

	@Override
	@Transactional
	public Set<CategoryVM> getCategories() {
		final Set<CategoryVM> res = cateRepo.findAll().stream().map(it -> mapper.map(it, CategoryVM.class))
				.collect(Collectors.toSet());
		final UserContext context = getUserContext();
		final Store store = context != null ? getStore(context) : null;
		if (store == null) {
			return res;
		}
		final List<CategoryVM> currentCategories = getCategories(0, Integer.MAX_VALUE, StringUtils.EMPTY,
				SortType.ascend, Constants.FIELD_ID, store.getId()).getContent();
		return res.stream().filter(it -> !currentCategories.contains(it)).collect(Collectors.toSet());
	}

}
