package com.fashion.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fashion.model.AccountVM;
import com.fashion.security.domain.UserDetailsCustom;
import com.fashion.service.IAccountService;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

	@Autowired
	private IAccountService accountService;

	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
		final AccountVM acc = accountService.getAccountByUsername(username);
		if (acc != null) {
			return new UserDetailsCustom(acc);
		}
		throw new UsernameNotFoundException(username);
	}
}
