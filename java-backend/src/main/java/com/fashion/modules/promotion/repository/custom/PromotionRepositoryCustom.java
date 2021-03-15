package com.fashion.modules.promotion.repository.custom;

import org.springframework.data.domain.Page;

import com.fashion.modules.promotion.domain.Promotion;
import com.fashion.modules.promotion.model.PromotionFilterReq;

public interface PromotionRepositoryCustom {
	
	Page<Promotion> filterPromotion(PromotionFilterReq req, Integer page, Integer pageSize, Integer storeId);

}
