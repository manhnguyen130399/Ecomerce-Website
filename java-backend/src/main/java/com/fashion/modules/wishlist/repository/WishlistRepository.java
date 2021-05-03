package com.fashion.modules.wishlist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fashion.modules.wishlist.domain.WishList;

public interface WishlistRepository extends JpaRepository<WishList, Integer> {

	WishList getWishListByProductIdAndAccountId(Integer productId, Integer accountId);

	@Query(" SELECT w.productId "//
			+ " FROM WishList w "//
			+ " WHERE w.accountId = :id ") //
	List<Integer> getWishListProductIdByAccountId(@Param("id") Integer accountId);

}
