package com.fashion.exception;

import org.springframework.util.StringUtils;

public class InvalidArgumentException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	private String code;

	public InvalidArgumentException(final String message) {
		this(null, message);
	}

	public InvalidArgumentException(final String code, final String message) {
		this(code, message, null);
	}

	public InvalidArgumentException(final String code, final String message, final Throwable cause) {
		super(message, cause);
		this.code = (StringUtils.hasText(code) ? code : "ERROR");
	}

	public String getCode() {
		return this.code;
	}

	public void setCode(final String code) {
		this.code = code;
	}

}
