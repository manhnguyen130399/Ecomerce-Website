package com.fashion.modules.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fashion.modules.account.domain.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
	
	Account findByUsername(final String username);
	
	@Query(" SELECT acc "
			+ " FROM Account acc "
			+ " WHERE acc.type = 2 AND acc.isActive = true ")
	List<Account> getCustomerAccount();

}
