package com.fashion.modules.store.service;

import java.util.List;

import com.fashion.modules.store.model.StoreReq;
import com.fashion.modules.store.model.StoreVM;

public interface StoreService {
	
	StoreVM createStore(final StoreReq req);
	
	StoreVM createStoreV2(final StoreReq req);

	StoreVM getStore(final Integer id);

	List<StoreVM> getStores();

	StoreVM updateStore(final StoreReq req, final Integer id);

	void deleteStore(final Integer id);
	
	List<StoreVM> getStoreByIds(final List<Integer> ids);

}
