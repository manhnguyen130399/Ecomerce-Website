package com.fashion.security.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fashion.modules.account.repository.AccountRepository;
import com.fashion.security.domain.LoginRequest;
import com.fashion.security.jwt.JwtUtils;
import com.fashion.web.BaseResource;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/api/auth")
public class AuthController extends BaseResource {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	AccountRepository accRepo;

	@Autowired
	JwtUtils JwtUtils;

	@PostMapping(value = "/authenticate")
	public ResponseEntity<Map<String, Object>> authentication(@RequestBody final LoginRequest loginRequest) {

		final Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		final String jwt = JwtUtils.generateJwtToken(authentication);
		return success(jwt);
	}

}
