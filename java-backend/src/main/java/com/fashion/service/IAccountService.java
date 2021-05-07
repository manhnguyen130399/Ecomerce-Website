package com.fashion.service;

import com.fashion.model.AccountVM;

public interface IAccountService {

	AccountVM getAccountByUsername(String username);
	
}
