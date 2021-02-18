package com.fashion.modules.promotion.service;

import java.text.ParseException;
import java.util.List;

import com.fashion.modules.promotion.model.PromotionRequest;
import com.fashion.modules.promotion.model.PromotionVM;

public interface PromotionService {

	PromotionVM createPromotion(PromotionRequest req);

	PromotionVM findPromotionById(Integer id);

	List<PromotionVM> getAllPromotionByStore();

	List<PromotionVM> getPromotionValidDate() throws ParseException;

	void deletePromotion(Integer id);

}
