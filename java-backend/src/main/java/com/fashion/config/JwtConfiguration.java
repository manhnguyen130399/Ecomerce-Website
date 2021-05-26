package com.fashion.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fashion.commons.enums.AccountType;
import com.fashion.security.jwt.AuthEntryPointJwt;
import com.fashion.security.jwt.AuthTokenFilter;
import com.fashion.security.service.UserDetailServiceImpl;

@Configuration
@EnableWebSecurity
public class JwtConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailServiceImpl userDetailService;

	@Autowired
	private AuthEntryPointJwt authEntryPointJwt;

	@Bean
	public AuthTokenFilter authTokenFilter() {
		return new AuthTokenFilter();
	}

	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {

		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {

		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailService).passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(final HttpSecurity http) throws Exception {
		final String seller = AccountType.SELLER.toString();
		final String admin = AccountType.ADMIN.toString();
		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(authEntryPointJwt).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()//
				.antMatchers(HttpMethod.POST, "/api/auth/**").permitAll()//
				.antMatchers(HttpMethod.POST, "/api/complain/create").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/promotion/valid-date").permitAll()//
				.antMatchers(HttpMethod.POST, "/api/promotion/code").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/store/existed").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/size/size-all-store").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/category/category-all-store").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/color/color-all-store").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/brand/brand-all-store").permitAll()//
				.antMatchers(HttpMethod.POST, "/api/product/product-all-store").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/product/fulltext-search").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/product/best-seller").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/product/**").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/blog/**").permitAll()//
				.antMatchers(HttpMethod.POST, "/api/store/v2").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/store/**").permitAll()//
				.antMatchers(HttpMethod.POST, "/api/product/detail").permitAll()//
				.antMatchers(HttpMethod.POST, "/api/product/update-quantity-product-detail")
				.hasAnyRole(AccountType.CUSTOMER.toString())//
				.antMatchers(HttpMethod.POST, "/api/product").permitAll()//
				.antMatchers(HttpMethod.GET, "/api/category").permitAll()//
				.antMatchers(HttpMethod.POST, "/api/blog/create").hasRole(seller)//
				.antMatchers("/api/brand/**").hasRole(seller)//
				.antMatchers("/api/category/**").hasRole(seller)//
				.antMatchers("/api/color/**").hasRole(seller)//
				.antMatchers("/api/size/**").hasRole(seller)//
				.antMatchers("/api/product/**").hasRole(seller)//
				.antMatchers(HttpMethod.PUT, "/api/store/**").hasRole(seller)//
				.antMatchers(HttpMethod.POST, "/api/promotion/**").hasRole(seller)//
				.antMatchers("/api/report/**").hasAnyRole(seller, admin)//
				.antMatchers(HttpMethod.PUT, "/api/blog/**").hasRole(admin)//
				.antMatchers(HttpMethod.DELETE, "/api/blog/**").hasRole(admin)//
				.antMatchers(HttpMethod.GET, "/api/store").hasRole(admin)//
				.antMatchers(HttpMethod.DELETE, "/api/store/**").hasRole(admin)//
			
				.antMatchers("/api/complain/**").hasRole(admin)//
				.antMatchers("/api/**")//
				.authenticated();
		http.addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}
}
