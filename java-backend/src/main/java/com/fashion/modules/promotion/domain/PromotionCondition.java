package com.fashion.modules.promotion.domain;

import java.io.Serializable;

import com.fashion.commons.enums.PromotionType;

import lombok.Data;

@Data
public class PromotionCondition implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Integer numUse;

	private PromotionType promotionType;

}
