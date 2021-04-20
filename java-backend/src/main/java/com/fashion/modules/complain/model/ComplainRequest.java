package com.fashion.modules.complain.model;

import lombok.Data;

@Data
public class ComplainRequest {

	private String content;

	private String email;
	
	private String phone;
	
	private String name;

}
