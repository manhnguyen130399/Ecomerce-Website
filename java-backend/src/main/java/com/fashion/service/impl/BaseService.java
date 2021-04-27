package com.fashion.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.fashion.domain.UserContext;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.comment.model.CommentVM;
import com.fashion.modules.store.domain.Store;
import com.fashion.modules.store.repository.StoreRepository;
import com.fashion.security.SecurityUtils;
import com.fashion.service.IAccountService;
import com.fashion.service.IBaseService;

public class BaseService implements IBaseService {

	@Autowired
	private StoreRepository storeRepo;

	@Autowired
	protected ModelMapper mapper;
	
	@Autowired
	private IAccountService accountService;

	@Override
	public UserContext getUserContext() {
		return SecurityUtils.getCurrentUserContext();
	}

	@Override
	public Store getStore(final UserContext context) {
		return storeRepo.findOneById(context.getStoreId());
	}

	@Override
	public Integer getCurrentStoreId() {
		return getUserContext().getStoreId();
	}
	
	@Override
	public CommentVM convertToVM(final Comment comment) {
		final CommentVM vm = mapper.map(comment, CommentVM.class);
		final String email = comment.getEmail();
		vm.setCustomerName(email);
		vm.setCustomerImage(accountService.getAccountByUsername(email).getImageUrl());
		return vm;
	}

}
