package com.fashion.modules.promotion.model;

import java.util.Date;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.SortType;
import com.fashion.model.BaseReq;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PromotionFilterReq extends BaseReq {

	private String title;
	private String code;
	@JsonFormat(pattern = Constants.DATE_FORMAT_YYYYMMDD_HYPHEN)
	private Date startDate;
	@JsonFormat(pattern = Constants.DATE_FORMAT_YYYYMMDD_HYPHEN)
	private Date endDate;
	private Integer discount;

	public PromotionFilterReq(final SortType sortOrder, final String sortField, final String title, final String code,
			final Date startDate, final Date endDate, final Integer discount) {
		super(sortOrder, sortField);
		this.title = title;
		this.code = code;
		this.startDate = startDate;
		this.endDate = endDate;
		this.discount = discount;
	}

	public PromotionFilterReq(final SortType sortOrder, final String sortField) {
		super(sortOrder, sortField);
	}

}
