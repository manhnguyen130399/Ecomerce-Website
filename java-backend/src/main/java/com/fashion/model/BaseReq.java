package com.fashion.model;

import com.fashion.commons.enums.SortEnum;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BaseReq {
	private SortEnum sortOrder;
	private String sortField;

	public BaseReq(final SortEnum sortOrder, final String sortField) {
		super();
		this.sortOrder = sortOrder;
		this.sortField = sortField;
	}

}
