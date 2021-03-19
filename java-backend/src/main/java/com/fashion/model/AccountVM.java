package com.fashion.model;

import java.util.Date;

import com.fashion.commons.enums.AccountType;

import lombok.Data;

@Data
public class AccountVM {

	private Integer id;

	private String username;

	private String imageUrl;

	private String password;

	private AccountType type;

	private Boolean isActive;

	private Date createdAt;

	private Date updatedAt;

}
