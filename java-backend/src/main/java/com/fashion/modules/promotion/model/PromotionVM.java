package com.fashion.modules.promotion.model;

import java.util.Date;

import com.fashion.modules.store.domain.Store;

import lombok.Data;

@Data
public class PromotionVM {

	private Integer id;

	private String title;

	private String code;

	private Date startDate;

	private Date endDate;

	private Integer discount;

	private String condition;

	private Store store;

}
