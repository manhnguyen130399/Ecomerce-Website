package com.fashion.modules.complain.model;

import com.fashion.commons.enums.ComplainEnum;

import lombok.Data;

@Data
public class ComplainVM {

	private Integer id;

	private String content;

	private String email;

	private ComplainEnum state;


}
