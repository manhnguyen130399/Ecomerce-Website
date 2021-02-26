package com.fashion.modules.account.model;

import java.util.Date;

import com.fashion.commons.enums.AccountEnum;

import lombok.Data;

@Data
public class AccountVM {
	
	private Integer id;

	private String username;

	private String password;

	private AccountEnum type;

	private Boolean isActive;

	private Date createdAt;

	private Date updatedAt;

}
