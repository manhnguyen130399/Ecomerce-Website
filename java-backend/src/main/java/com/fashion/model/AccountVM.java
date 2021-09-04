package com.fashion.model;

import java.io.Serializable;
import java.util.Date;

import com.fashion.commons.enums.AccountType;

import lombok.Data;

@Data
public class AccountVM implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2336444949714109626L;

	private Integer id;

	private String username;

	private String imageUrl;

	private String password;

	private AccountType type;

	private Boolean isActive;

	private Date createdAt;

	private Date updatedAt;

	private Integer storeId;

}
