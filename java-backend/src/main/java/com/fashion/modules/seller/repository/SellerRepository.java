package com.fashion.modules.seller.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.seller.domain.Seller;

public interface SellerRepository extends JpaRepository<Seller, Integer> {

	Seller findOneByAccountId(@Param("id") Integer accountId);

}
