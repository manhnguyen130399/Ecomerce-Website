package com.fashion.modules.store.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.fashion.commons.enums.SortEnum;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.store.domain.Store;
import com.fashion.modules.store.model.StoreReq;
import com.fashion.modules.store.model.StoreVM;
import com.fashion.modules.store.repository.StoreRepository;
import com.fashion.modules.store.service.StoreService;
import com.fashion.service.impl.BaseService;
import com.google.common.collect.Iterables;

@Service
public class StoreServiceImpl extends BaseService implements StoreService {

	@Autowired
	private StoreRepository storeRepo;

	@Transactional
	@Override
	public StoreVM getStore(final Integer id) {
		return mapper.map(storeRepo.findOneById(id), StoreVM.class);
	}

	@Transactional
	@Override
	public Page<StoreVM> getStores(final String storeName, final SortEnum sortOrder, final String sortField,
			final Integer page, final Integer pageSize) {
		return storeRepo.findAll(PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, StoreVM.class));
	}

	@Transactional
	@Override
	public StoreVM updateStore(final StoreReq req, final Integer id) {
		final Store store = storeRepo.findOneById(id);
		mapper.map(req, store);
		return mapper.map(store, StoreVM.class);
	}

	@Transactional
	@Override
	public StoreVM deleteStore(final Integer id, final String storeName, final SortEnum sortOrder,
			final String sortField, final Integer page, final Integer pageSize) {
		storeRepo.deleteById(id);
		final List<StoreVM> content = getStores(storeName, sortOrder, sortField, page, pageSize).getContent();
		final StoreVM last = Iterables.getLast(content);
		return CollectionUtils.isNotEmpty(content) && id != last.getId() ? last : null;
	}

	@Override
	@Transactional
	public StoreVM createStore(final StoreReq req) {
		final Store store = mapper.map(req, Store.class);
		try {
			return mapper.map(storeRepo.save(store), StoreVM.class);
		} catch (Exception e) {
			throw new InvalidArgumentException("Duplicated store name");
		}

	}

	@Override
	@Transactional
	public List<StoreVM> getStoreByIds(final List<Integer> ids) {
		return storeRepo.getStoreByIds(ids).stream().map(it -> mapper.map(it, StoreVM.class))
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public Page<StoreVM> searchStore(final String storeName, final SortEnum sortOrder, final String sortField,
			final Integer page, final Integer pageSize) {
		return storeRepo
				.seachStoreByKeyWord(storeName,
						PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, StoreVM.class));
	}

}
