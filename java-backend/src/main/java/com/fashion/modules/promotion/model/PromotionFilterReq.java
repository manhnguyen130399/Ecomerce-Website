package com.fashion.modules.promotion.model;

import java.util.Date;

import com.fashion.commons.constants.Constants;
import com.fashion.model.BaseReq;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class PromotionFilterReq extends BaseReq {

	private String title;
	private String code;
	@JsonFormat(pattern = Constants.DATE_FORMAT_YYYYMMDD_HYPHEN)
	private Date startDate;
	@JsonFormat(pattern = Constants.DATE_FORMAT_YYYYMMDD_HYPHEN)
	private Date endDate;
	private Integer discount;
}
