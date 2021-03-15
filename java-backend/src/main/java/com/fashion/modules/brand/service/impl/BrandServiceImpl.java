package com.fashion.modules.brand.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fashion.commons.enums.SortEnum;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.modules.brand.domain.Brand;
import com.fashion.modules.brand.model.BrandVM;
import com.fashion.modules.brand.repository.BrandRepository;
import com.fashion.modules.brand.service.BrandService;
import com.fashion.modules.store.domain.Store;
import com.fashion.service.impl.BaseService;
import com.google.common.collect.Iterables;

@Service
public class BrandServiceImpl extends BaseService implements BrandService {

	@Autowired
	private BrandRepository brandRepo;

	@Override
	@Transactional
	public BrandVM createBrand(final BrandVM req) {
		final Store store = getStore(getUserContext());
		final Brand brand = new Brand();
		brand.setBrandName(req.getBrandName());
		brand.setStores(Collections.singleton(store));
		brandRepo.save(brand);
		return mapper.map(brand, BrandVM.class);
	}

	@Override
	@Transactional
	public BrandVM findById(final Integer id) {
		return mapper.map(brandRepo.findOneByIdAndStoreId(id, getStore(getUserContext()).getId()), BrandVM.class);
	}

	@Override
	@Transactional
	public Page<BrandVM> findAllByStore(final Integer page, final Integer pageSize, final String brandName,
			final SortEnum sortOrder, final String sortField) {
		if (StringUtils.isEmpty(brandName)) {
			return brandRepo
					.findAllByStoreId(getStore(getUserContext()).getId(),
							PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
					.map(it -> mapper.map(it, BrandVM.class));
		}
		return seachBrandByStoreAndKeyword(brandName, sortOrder, page, pageSize, sortField);
	}

	@Override
	@Transactional
	public BrandVM deleteBrand(final Integer id, final Integer page, final Integer pageSize, final String brandName,
			final SortEnum sortOrder, final String sortField) {
		final Store store = getStore(getUserContext());
		final Brand brand = brandRepo.findOneByIdAndStoreId(id, store.getId());
		final Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
		final List<Brand> brands = brandRepo.findAllByStoreId(store.getId(), pageable).getContent();
		store.setBrands(brands.stream().filter(it -> !it.equals(brand)).collect(Collectors.toSet()));
		final List<BrandVM> content = findAllByStore(page, pageSize, brandName, sortOrder, sortField).getContent();
		if (CollectionUtils.isEmpty(content)) {
			return null;
		}
		final BrandVM last = Iterables.getLast(content);
		return id != last.getId() ? last : null;
	}

	@Override
	@Transactional
	public Page<BrandVM> seachBrandByStoreAndKeyword(final String brandName, final SortEnum sortOrder,
			final Integer page, final Integer pageSize, final String sortField) {
		return brandRepo
				.searchByKeywordAndStore(brandName, getStore(getUserContext()).getId(),
						PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, BrandVM.class));
	}

}
