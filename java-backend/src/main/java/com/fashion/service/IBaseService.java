package com.fashion.service;

import com.fashion.domain.UserContext;
import com.fashion.modules.store.domain.Store;

public interface IBaseService {
	
	UserContext getUserContext();

	Store getStore(final UserContext context);
	
	Integer getCurrentStoreId();

}
