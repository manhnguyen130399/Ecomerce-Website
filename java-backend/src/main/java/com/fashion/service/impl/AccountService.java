package com.fashion.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fashion.commons.constants.Constants;
import com.fashion.model.AccountRes;
import com.fashion.model.AccountVM;
import com.fashion.service.IAccountService;

@Service
public class AccountService implements IAccountService {

	@Autowired
	private RestTemplate restTemplate;

	@Override
	public AccountVM getAccountByUsername(final String username) {
		return restTemplate
				.getForObject(Constants.URL + "/users/getAccountInfoByUserName?userName=" + username, AccountRes.class)
				.getData();
	}

}
