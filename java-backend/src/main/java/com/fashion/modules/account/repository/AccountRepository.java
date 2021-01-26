package com.fashion.modules.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.account.domain.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
	
	Account findByUsername(final String username);

}
