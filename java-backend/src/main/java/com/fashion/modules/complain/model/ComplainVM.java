package com.fashion.modules.complain.model;

import com.fashion.commons.enums.ComplainEnum;

import lombok.Data;

@Data
public class ComplainVM extends ComplainRequest {

	private Integer id;
	
	private ComplainEnum state;
	
}
