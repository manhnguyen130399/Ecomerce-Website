package com.fashion.modules.brand.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
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
	public List<BrandVM> findAllByStore() {
		return brandRepo.findAllByStoreId(getStore(getUserContext()).getId()).stream()
				.map(it -> mapper.map(it, BrandVM.class)).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void deleteBrand(final Integer id) {
		final Store store = getStore(getUserContext());
		final Brand brand = brandRepo.findOneByIdAndStoreId(id, store.getId());
		final List<Brand> brands = brandRepo.findAllByStoreId(store.getId());
		store.setBrands(brands.stream().filter(it -> !it.equals(brand)).collect(Collectors.toSet()));

	}

}
