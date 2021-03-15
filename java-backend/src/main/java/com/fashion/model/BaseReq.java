package com.fashion.model;

import com.fashion.commons.enums.SortEnum;

import lombok.Data;

@Data
public class BaseReq {
	private SortEnum sortOrder;
	private String sortField;
}
