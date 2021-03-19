package com.fashion.model;

import com.fashion.commons.enums.SortType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BaseReq {
	private SortType sortOrder;
	private String sortField;

	public BaseReq(final SortType sortOrder, final String sortField) {
		super();
		this.sortOrder = sortOrder;
		this.sortField = sortField;
	}

}
