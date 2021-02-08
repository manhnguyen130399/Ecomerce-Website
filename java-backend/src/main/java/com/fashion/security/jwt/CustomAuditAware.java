package com.fashion.security.jwt;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.fashion.security.domain.UserDetailsCustom;

public class CustomAuditAware implements AuditorAware<String> {

	@Override
	public Optional<String> getCurrentAuditor() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		final UserDetailsCustom userDetails = (UserDetailsCustom) authentication.getPrincipal();

		return Optional.of(userDetails.getUsername());
	}
}