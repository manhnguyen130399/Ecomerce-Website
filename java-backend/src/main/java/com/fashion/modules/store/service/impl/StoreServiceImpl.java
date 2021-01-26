package com.fashion.modules.store.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashion.modules.store.domain.Store;
import com.fashion.modules.store.model.StoreReq;
import com.fashion.modules.store.model.StoreVM;
import com.fashion.modules.store.repository.StoreRepository;
import com.fashion.modules.store.service.StoreService;

@Service
public class StoreServiceImpl implements StoreService{
	
	@Autowired
	private StoreRepository storeRepo;
	
	@Autowired
	private ModelMapper  mapper;

	@Transactional
	@Override
	public StoreVM createStore(final StoreReq vm) {
		return mapper.map(storeRepo.save(mapper.map(vm, Store.class)), StoreVM.class);
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

	
}
