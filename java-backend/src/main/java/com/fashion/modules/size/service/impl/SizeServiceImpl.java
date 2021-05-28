package com.fashion.modules.size.service.impl;

import java.util.Collections;
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
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.SortType;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.domain.UserContext;
import com.fashion.modules.size.domain.Size;
import com.fashion.modules.size.model.SizeVM;
import com.fashion.modules.size.repository.SizeRepository;
import com.fashion.modules.size.service.SizeService;
import com.fashion.modules.store.domain.Store;
import com.fashion.service.impl.BaseService;
import com.google.common.collect.Iterables;

@Service
public class SizeServiceImpl extends BaseService implements SizeService {

	@Autowired
	private SizeRepository sizeRepo;

	@Override
	@Transactional
	@CacheEvict(value = Constants.SIZES, allEntries = true)
	public SizeVM createSize(final SizeVM size) {
		final UserContext userContext = getUserContext();
		final Store store = getStore(userContext);
		final Integer id = size.getId();
		final boolean idNull = id == null;
		final Size sizeData = !idNull ? sizeRepo.getOne(id) : mapper.map(size, Size.class);
		sizeData.setStores(Collections.singleton(store));
		if (idNull) {
			sizeData.setCreatedBy(userContext.getUsername());
			sizeRepo.save(sizeData);
		}
		return mapper.map(sizeData, SizeVM.class);
	}

	@Override
	@Transactional
	public SizeVM findById(final Integer id) {
		return mapper.map(sizeRepo.findOneByIdAndStoreId(id, getCurrentStoreId()), SizeVM.class);
	}

	@Override
	@Transactional
	public Page<SizeVM> findAllByStore(final Integer page, final Integer pageSize, final String sizeName,
			final SortType sortOrder, final String sortField) {
		if (StringUtils.isEmpty(sizeName)) {
			return sizeRepo
					.findAllByStoreId(getCurrentStoreId(),
							PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
					.map(it -> mapper.map(it, SizeVM.class));
		} else {
			return searchByKeyword(sizeName, page, pageSize, sortOrder, sortField);
		}
	}

	@Override
	@Transactional
	@CacheEvict(value = Constants.SIZES, allEntries = true)
	public SizeVM deleteSize(final Integer id, final Integer page, final Integer pageSize, final String sizeName,
			final SortType sortOrder, final String sortField) {
		final Integer storeId = getCurrentStoreId();
		final Size size = sizeRepo.findOneByIdAndStoreId(id, storeId);
		final Store store = getStore(getUserContext());
		size.getStores().remove(store);
		final List<SizeVM> content = findAllByStore(page, pageSize, sizeName, sortOrder, sortField).getContent();
		if (CollectionUtils.isNotEmpty(content)) {
			final SizeVM last = Iterables.getLast(content);
			return last.getId() != id ? last : null;
		}
		return null;

	}

	@Override
	@Transactional
	@Cacheable(value = Constants.SIZES)
	public Page<SizeVM> searchByKeyword(final String keyword, final Integer page, final Integer pageSize,
			final SortType sortOrder, final String sortField) {
		return sizeRepo
				.searchSizeByKeyword(keyword, getCurrentStoreId(),
						PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, SizeVM.class));
	}

	@Override
	@Transactional
	@Cacheable(value = Constants.SIZES)
	public Set<SizeVM> getAllSize() {
		return sizeRepo.findAll().stream().map(it -> mapper.map(it, SizeVM.class)).collect(Collectors.toSet());
	}

}
