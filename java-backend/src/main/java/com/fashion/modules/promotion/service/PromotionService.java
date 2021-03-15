package com.fashion.modules.promotion.service;

import java.text.ParseException;
import java.util.List;

import org.springframework.data.domain.Page;

import com.fashion.modules.promotion.model.PromotionFilterReq;
import com.fashion.modules.promotion.model.PromotionRequest;
import com.fashion.modules.promotion.model.PromotionVM;
import com.fashion.modules.promotion.model.QrVM;

public interface PromotionService {

	PromotionVM createPromotion(PromotionRequest req) throws Exception;

	PromotionVM findPromotionById(Integer id);

	Page<PromotionVM> getAllPromotionByStore(Integer page, Integer pageSize, PromotionFilterReq req);

	List<QrVM> getPromotionValidDate() throws ParseException;

	void deletePromotion(Integer id);

	String getDiscountPromtion(String code);

	Page<PromotionVM> searchPromotionByKeywordAndStore(String keyword, Integer page, Integer pageSize);

	Page<PromotionVM> filterPromotion(PromotionFilterReq req, Integer page, Integer pageSize);

}
