package com.fashion.modules.brand.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.SortType;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.domain.UserContext;
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
	@CachePut(value = Constants.BRANDS, key = "#req.brandName")
	public BrandVM createBrand(final BrandVM req) {
		final Store store = getStore(getUserContext());
		final Brand existed = brandRepo.getByBrandName(req.getBrandName());
		final boolean hasBrand = existed != null;
		final Brand brand = hasBrand ? existed : new Brand();
		if (hasBrand && store.getBrands().contains(brand)) {
			return mapper.map(brand, BrandVM.class);
		}
		final Set<Store> stores = brand.getStores();
		stores.add(store);
		brand.setStores(stores);
		if (!hasBrand) {
			brand.setBrandName(req.getBrandName());
			brandRepo.save(brand);
		}
		return mapper.map(brand, BrandVM.class);
	}

	@Override
	@Transactional
//	@Cacheable(value = Constants.BRANDS, key = "#id")
	public BrandVM findById(final Integer id) {
		return mapper.map(brandRepo.findOneByIdAndStoreId(id, getCurrentStoreId()), BrandVM.class);
	}

	@Override
	@Transactional
	@Cacheable(value = Constants.BRANDS)
	public Page<BrandVM> getBrands(final Integer page, final Integer pageSize, final String brandName,
			final SortType sortOrder, final String sortField) {
		return !isAdmin() ? getBrandsBySeller(page, pageSize, brandName, sortOrder, sortField)
				: getBrandsByAdmin(page, pageSize, brandName, sortOrder, sortField);
	}

	private Page<BrandVM> getBrandsByAdmin(final Integer page, final Integer pageSize, final String brandName,
			final SortType sortOrder, final String sortField) {
		final PageRequest pageable = PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField));
		return StringUtils.isEmpty(brandName) ? brandRepo.findAll(pageable).map(it -> mapper.map(it, BrandVM.class))
				: brandRepo.getByBrandNameLike(CommonUtil.customLikeValueVariable(brandName), pageable)
						.map(it -> mapper.map(it, BrandVM.class));
	}

	private Page<BrandVM> getBrandsBySeller(final Integer page, final Integer pageSize, final String brandName,
			final SortType sortOrder, final String sortField) {
		if (StringUtils.isEmpty(brandName)) {
			return brandRepo
					.findAllByStoreId(getCurrentStoreId(),
							PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
					.map(it -> mapper.map(it, BrandVM.class));
		}
		return seachBrandByStoreAndKeyword(brandName, sortOrder, page, pageSize, sortField);
	}

	@Override
	@Transactional
	@CacheEvict(value = Constants.BRANDS, key = "#id")
	public BrandVM deleteBrand(final Integer id, final Integer page, final Integer pageSize, final String brandName,
			final SortType sortOrder, final String sortField) {
		if (!isAdmin()) {
			final Store store = getStore(getUserContext());
			final Brand brand = brandRepo.findOneByIdAndStoreId(id, store.getId());
			brand.getStores().remove(store);
		} else {
			brandRepo.deleteById(id);
		}
		final List<BrandVM> content = getBrands(page, pageSize, brandName, sortOrder, sortField).getContent();
		if (CollectionUtils.isEmpty(content)) {
			return null;
		}
		final BrandVM last = Iterables.getLast(content);
		return id != last.getId() ? last : null;
	}

	@Override
	@Transactional
	@Cacheable(value = Constants.BRANDS)
	public Page<BrandVM> seachBrandByStoreAndKeyword(final String brandName, final SortType sortOrder,
			final Integer page, final Integer pageSize, final String sortField) {
		return brandRepo
				.searchByKeywordAndStore(brandName, getCurrentStoreId(),
						PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, BrandVM.class));
	}

	@Override
	@Transactional
	@Cacheable(value = Constants.BRANDS)
	public Set<BrandVM> getBrands() {
		final Set<BrandVM> brands = brandRepo.findAll().stream().map(it -> mapper.map(it, BrandVM.class))
				.collect(Collectors.toSet());
		final UserContext context = getUserContext();
		final Store store = context != null ? getStore(context) : null;
		if (store == null) {
			return brands;
		}
		final List<BrandVM> currentBrands = getBrands(0, Integer.MAX_VALUE, StringUtils.EMPTY, SortType.ascend,
				Constants.FIELD_ID).getContent();
		return brands.stream().filter(it -> !currentBrands.contains(it)).collect(Collectors.toSet());
	}

}
