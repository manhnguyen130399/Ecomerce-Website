package com.fashion.modules.store.model;

import java.util.Date;
import java.util.List;

import com.fashion.commons.constants.Constants;
import com.fashion.modules.promotion.model.PromotionVM;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreVM extends StoreReq {

	private Integer id;

	private List<PromotionVM> promotions;
	
	@JsonFormat(pattern = Constants.DATE_FORMAT_YYYYMM_HYPHEN)
	private Date createdAt;
	
	private Integer totalProduct;

}
