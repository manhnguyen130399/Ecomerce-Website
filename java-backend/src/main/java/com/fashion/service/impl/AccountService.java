package com.fashion.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.constants.RestURL;
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
				.getForObject(Constants.USER_URL + RestURL.GET_ACCOUNT_INFO_BY_USERNAME + username, AccountRes.class)
				.getData();
	}

	@Override
	public AccountVM getAccountById(final Integer id) {
		return restTemplate.getForObject(Constants.USER_URL + RestURL.GET_ACCOUNT_INFO_BY_ID + id, AccountRes.class)
				.getData();
	}
	
}
