package com.fashion.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.fashion.domain.UserContext;
import com.fashion.modules.seller.repository.SellerRepository;
import com.fashion.modules.store.domain.Store;
import com.fashion.modules.store.repository.StoreRepository;
import com.fashion.security.SecurityUtils;
import com.fashion.service.IBaseService;

public class BaseService implements IBaseService {

	@Autowired
	private StoreRepository storeRepo;

	@Autowired
	private SellerRepository sellerRepo;

	@Autowired
	protected ModelMapper mapper;

	@Override
	public UserContext getUserContext() {

		return SecurityUtils.getCurrentUserContext();
	}

	@Override
	public Store getStore(final UserContext context) {
		return storeRepo.findOneById(sellerRepo.findOneByAccountId(context.getAccountId()).getStoreId());

	}

}
