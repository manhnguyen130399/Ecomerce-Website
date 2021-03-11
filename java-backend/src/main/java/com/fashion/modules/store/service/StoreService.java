package com.fashion.modules.store.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.fashion.modules.store.model.StoreReq;
import com.fashion.modules.store.model.StoreVM;

public interface StoreService {
	
	StoreVM createStore(final StoreReq req);
	
	StoreVM createStoreV2(final StoreReq req);

	StoreVM getStore(final Integer id);

	Page<StoreVM> getStores(final Integer page, final Integer pageSize);

	StoreVM updateStore(final StoreReq req, final Integer id);

	void deleteStore(final Integer id);
	
	List<StoreVM> getStoreByIds(final List<Integer> ids);
	
	Page<StoreVM> searchStore(final String keyword, final Integer page, final Integer pageSize);

}
