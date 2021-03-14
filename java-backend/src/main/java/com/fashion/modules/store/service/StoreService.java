package com.fashion.modules.store.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.SortEnum;
import com.fashion.modules.store.model.StoreReq;
import com.fashion.modules.store.model.StoreVM;

public interface StoreService {

	StoreVM createStore(final StoreReq req);

	StoreVM getStore(final Integer id);

	Page<StoreVM> getStores(final String storeName, final SortEnum sortOrder, final String sortField,
			final Integer page, final Integer pageSize);

	StoreVM updateStore(final StoreReq req, final Integer id);

	StoreVM deleteStore(final Integer id, final String storeName, final SortEnum sortOrder, final String sortField,
			final Integer page, final Integer pageSize);

	List<StoreVM> getStoreByIds(final List<Integer> ids);

	Page<StoreVM> searchStore(final String storeName, final SortEnum sortOrder, final String sortField,
			final Integer page, final Integer pageSize);

}
