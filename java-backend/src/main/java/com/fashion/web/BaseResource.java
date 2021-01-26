package com.fashion.web;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;

import com.fashion.commons.constants.Constants;


public class BaseResource {

	protected ResponseEntity<Map<String, Object>> success(final Object data) {
		return this.success(data, null, null, true);
	}

	protected ResponseEntity<Map<String, Object>> success(final Object data, final String code, final String message,
			final boolean needTranslate) {
		final Map<String, Object> successRes = new LinkedHashMap<>();
		successRes.put(Constants.DATA, data);
		if (StringUtils.hasText(code)) {
			successRes.put(Constants.CODE, code);
		} else {
			successRes.put(Constants.CODE, HttpStatus.OK.name());
		}

		successRes.put(Constants.MESSAGE, HttpStatus.OK.name());

		return new ResponseEntity<>(successRes, HttpStatus.OK);
	}

}
