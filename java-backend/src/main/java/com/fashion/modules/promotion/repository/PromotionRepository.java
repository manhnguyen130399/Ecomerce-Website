package com.fashion.modules.promotion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.promotion.domain.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {

}
