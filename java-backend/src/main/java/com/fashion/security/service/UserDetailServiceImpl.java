package com.fashion.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fashion.modules.account.domain.Account;
import com.fashion.modules.account.repository.AccountRepository;
import com.fashion.security.domain.UserDetailsCustom;

@Service
public class UserDetailServiceImpl implements UserDetailsService{

	@Autowired
	private AccountRepository accRepo;
	
	
	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
		final Account acc = accRepo.findByUsername(username);
		if (acc != null) {
			return new UserDetailsCustom(acc);
		}
		throw new UsernameNotFoundException(username);
	}

}
