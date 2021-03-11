package com.fashion.modules.brand.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fashion.modules.brand.domain.Brand;
import com.fashion.modules.brand.model.BrandVM;
import com.fashion.modules.brand.repository.BrandRepository;
import com.fashion.modules.brand.service.BrandService;
import com.fashion.modules.store.domain.Store;
import com.fashion.service.impl.BaseService;

@Service
public class BrandServiceImpl extends BaseService implements BrandService {

	@Autowired
	private BrandRepository brandRepo;

	@Override
	@Transactional
	public BrandVM createBrand(final BrandVM req) {
		final Store store = getStore(getUserContext());
		final Set<Brand> brands = store.getBrands();
		brands.add(mapper.map(req, Brand.class));
		store.setBrands(brands);
		return req;
	}

	@Override
	@Transactional
	public BrandVM findById(final Integer id) {
		return mapper.map(brandRepo.findOneByIdAndStoreId(id, getStore(getUserContext()).getId()), BrandVM.class);
	}

	@Override
	@Transactional
	public Page<BrandVM> findAllByStore(final Integer page, final Integer pageSize) {
		final Pageable pageable = PageRequest.of(page, pageSize);
		return brandRepo.findAllByStoreId(getStore(getUserContext()).getId(), pageable)
				.map(it -> mapper.map(it, BrandVM.class));
	}

	@Override
	@Transactional
	public void deleteBrand(final Integer id) {
		final Store store = getStore(getUserContext());
		final Brand brand = brandRepo.findOneByIdAndStoreId(id, store.getId());
		final Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
		final List<Brand> brands = brandRepo.findAllByStoreId(store.getId(),pageable).getContent();
		store.setBrands(brands.stream().filter(it -> !it.equals(brand)).collect(Collectors.toSet()));

	}

	@Override
	@Transactional
	public Page<BrandVM> seachBrandByStoreAndKeyword(final String keyword, final Integer page, final Integer pageSize) {
		return brandRepo
				.searchByKeywordAndStore(keyword, getStore(getUserContext()).getId(), PageRequest.of(page, pageSize))
				.map(it -> mapper.map(it, BrandVM.class));
	}

}
