package com.fashion.model;

import java.io.Serializable;

import com.fashion.commons.enums.SortType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BaseReq implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private SortType sortOrder;
	private String sortField;

	public BaseReq(final SortType sortOrder, final String sortField) {
		super();
		this.sortOrder = sortOrder;
		this.sortField = sortField;
	}

}
