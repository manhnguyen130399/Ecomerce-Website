package com.fashion.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserContext {
	private String username;
	private Integer id;
	private Integer storeId;
	private Integer accountId;
	private String email;
	private String gender;

}
