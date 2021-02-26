package com.fashion.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

import com.fashion.security.jwt.CustomAuditAware;

@Configuration
public class AuditorAwareConfig {

	@Bean
	public AuditorAware<String> auditorAware() {
		return new CustomAuditAware();
	}
}
