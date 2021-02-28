package com.fashion.modules.complain.model;

import com.fashion.commons.enums.ComplainEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplainVM extends ComplainRequest {

	private Integer id;
	
	private ComplainEnum state;
	
}
