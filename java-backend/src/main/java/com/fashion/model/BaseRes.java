package com.fashion.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class BaseRes implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7899283521416059460L;
	private String message;
	private String code;

}
