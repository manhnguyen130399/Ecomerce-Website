package com.fashion.security.jwt;

import java.nio.charset.Charset;
import java.util.Date;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.fashion.security.domain.UserDetailsCustom;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {

	private static final String SERECT = "ThisIsShopicaTokenKeyFromUserService";

	private static final long EXPIRATION = 604800000L;

	public String generateJwtToken(final Authentication authentication) {

		final UserDetailsCustom userDetailsCustom = (UserDetailsCustom) authentication.getPrincipal();
		
		return Jwts.builder().setSubject(userDetailsCustom.getUsername()).setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + EXPIRATION)).signWith(SignatureAlgorithm.HS512, SERECT.getBytes(Charset.forName("UTF-8")))
				.compact();

	}

	public String getUserNameFromJwtToken(final String token) {
		return Jwts.parser().setSigningKey(SERECT.getBytes(Charset.forName("UTF-8"))).parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateJwtToken(final String authToken) {
		try {
			Jwts.parser().setSigningKey(SERECT.getBytes(Charset.forName("UTF-8"))).parseClaimsJws(authToken);
			return true;
		} catch (MalformedJwtException ex) {
			log.error("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			log.error("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			log.error("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			log.error("JWT claims string is empty.");
		}
		return false;
	}
}
