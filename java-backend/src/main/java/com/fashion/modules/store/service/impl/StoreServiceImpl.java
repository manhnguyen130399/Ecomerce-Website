package com.fashion.modules.store.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashion.domain.UserContext;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.account.repository.AccountRepository;
import com.fashion.modules.seller.domain.Seller;
import com.fashion.modules.seller.repository.SellerRepository;
import com.fashion.modules.store.domain.Store;
import com.fashion.modules.store.model.StoreReq;
import com.fashion.modules.store.model.StoreVM;
import com.fashion.modules.store.repository.StoreRepository;
import com.fashion.modules.store.service.StoreService;
import com.fashion.service.impl.BaseService;

@Service
public class StoreServiceImpl extends BaseService implements StoreService {
	
	@Autowired
	private StoreRepository storeRepo;
	
	@Autowired
	private SellerRepository sellerRepository;
	
	@Autowired
	private AccountRepository accountRepo;

	@Transactional
	@Override
	public StoreVM createStore(final StoreReq vm) {
		final UserContext context = getUserContext();
		final Store store = mapper.map(vm, Store.class);
		final Seller seller = new Seller();
		seller.setStoreId(storeRepo.save(store).getId());
		seller.setEmail(context.getEmail());
		seller.setAccountId(context.getAccountId());
		seller.setEmail(context.getEmail());
		sellerRepository.save(seller);
		return mapper.map(store, StoreVM.class);
	}

	@Transactional
	@Override
	public StoreVM getStore(final Integer id) {		
		return mapper.map(storeRepo.findOneById(id), StoreVM.class);
	}

	@Transactional
	@Override
	public List<StoreVM> getStores() {
		return storeRepo.findAll().stream().map(it -> mapper.map(it, StoreVM.class)).collect(Collectors.toList());
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
	public void deleteStore(final Integer id) {
		
		storeRepo.deleteById(id);
		
	}

	@Override
	@Transactional
	public StoreVM createStoreV2(StoreReq req) {
		
		final Store store = mapper.map(req, Store.class);
		try {
			return mapper.map(storeRepo.save(store), StoreVM.class);
		} catch (Exception e) {
			throw new InvalidArgumentException("Duplicated store name");
		}

	}

	
}
