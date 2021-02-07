package com.fashion.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.fashion.domain.UserContext;
import com.fashion.modules.account.domain.Account;
import com.fashion.security.domain.UserDetailsCustom;

public class SecurityUtils {

	private static final Logger LOG = LoggerFactory.getLogger(SecurityUtils.class);

	private static Authentication getAuthentication() {
		final SecurityContext securityContext = SecurityContextHolder.getContext();
		final Authentication authentication = securityContext.getAuthentication();
		if (authentication != null) {
			return authentication;
		}
		LOG.warn("::::: Security context stored object authentication is null.");
		return null;
	}

	public static UserContext getCurrentUserContext() {

		final Authentication authentication = getAuthentication();

		if (authentication != null) {
			final UserDetailsCustom userDetails = (UserDetailsCustom) authentication.getPrincipal();
			final Account acc = userDetails.getAccount();

			return new UserContext(acc.getUsername(), null, null, acc.getId(), null, null);
		}
		return null;

	}

}
