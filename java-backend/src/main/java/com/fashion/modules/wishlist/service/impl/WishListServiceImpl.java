package com.fashion.modules.wishlist.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.ErrorMessage;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.model.ProductVM;
import com.fashion.modules.product.repository.ProductRepository;
import com.fashion.modules.wishlist.domain.WishList;
import com.fashion.modules.wishlist.repository.WishlistRepository;
import com.fashion.modules.wishlist.service.WishListService;
import com.fashion.service.impl.BaseService;

@Service
public class WishListServiceImpl extends BaseService implements WishListService {

	@Autowired
	private WishlistRepository wishListRepo;

	@Autowired
	private ProductRepository productRepo;

	@Override
	@Transactional
	public ProductVM create(final Integer productId) {
		final Product product = getProduct(productId);
		final Integer accountId = getUserContext().getAccountId();
		if (findOneWishList(productId, accountId) != null) {
			throw new InvalidArgumentException(ErrorMessage.DUPLICATE_WISHLIST);
		}
		final WishList wl = new WishList();
		wl.setAccountId(accountId);
		wl.setProductId(productId);
		wishListRepo.save(wl);
		return convertProductToVM(product);
	}

	private Product getProduct(final Integer productId) {
		final Product product = productRepo.getOne(productId);
		if (product == null) {
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND);
		}
		return product;
	}

	@Override
	@Transactional
	public void delete(final Integer productId) {
		final WishList wl = findOneWishList(productId, getUserContext().getAccountId());
		if (wl == null) {
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND);
		}
		wishListRepo.delete(wl);
	}

	private WishList findOneWishList(final Integer productId, final Integer accountId) {
		getProduct(productId);
		final WishList wl = wishListRepo.getWishListByProductIdAndAccountId(productId, accountId);
		return wl;
	}

	@Override
	@Transactional
	public Page<ProductVM> getProductWishList(final Integer page, final Integer pageSize) {
		return productRepo
				.getProductByIdIn(wishListRepo.getWishListProductIdByAccountId(getUserContext().getAccountId()),
						PageRequest.of(page, pageSize))
				.map(it -> convertProductToVM(it));
	}

}
