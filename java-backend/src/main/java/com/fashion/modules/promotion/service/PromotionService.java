package com.fashion.modules.promotion.service;

import java.text.ParseException;
import java.util.List;

import com.fashion.modules.promotion.model.PromotionRequest;
import com.fashion.modules.promotion.model.PromotionVM;
import com.fashion.modules.promotion.model.QrVM;

public interface PromotionService {

	PromotionVM createPromotion(PromotionRequest req) throws Exception;

	PromotionVM findPromotionById(Integer id);

	List<PromotionVM> getAllPromotionByStore();

	List<QrVM> getPromotionValidDate() throws ParseException;

	void deletePromotion(Integer id);

}
