package com.fashion.service.impl;

import java.util.Comparator;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.fashion.commons.enums.AccountType;
import com.fashion.domain.UserContext;
import com.fashion.modules.brand.domain.Brand;
import com.fashion.modules.category.domain.Category;
import com.fashion.modules.color.domain.Color;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.comment.model.CommentVM;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.model.ProductDetailVM;
import com.fashion.modules.product.model.ProductImageVM;
import com.fashion.modules.product.model.ProductVM;
import com.fashion.modules.size.domain.Size;
import com.fashion.modules.store.domain.Store;
import com.fashion.modules.store.repository.StoreRepository;
import com.fashion.security.SecurityUtils;
import com.fashion.service.IAccountService;
import com.fashion.service.IBaseService;

public class BaseService implements IBaseService {

	@Autowired
	private StoreRepository storeRepo;

	@Autowired
	protected ModelMapper mapper;
	
	@Autowired
	private IAccountService accountService;

	@Override
	public UserContext getUserContext() {
		return SecurityUtils.getCurrentUserContext();
	}

	@Override
	public Store getStore(final UserContext context) {
		return storeRepo.findOneById(context.getStoreId());
	}

	@Override
	public Integer getCurrentStoreId() {
		return getUserContext().getStoreId();
	}
	
	@Override
	public CommentVM convertToVM(final Comment comment) {
		final CommentVM vm = mapper.map(comment, CommentVM.class);
		final String email = comment.getEmail();
		vm.setCustomerName(email);
		vm.setCustomerImage(accountService.getAccountByUsername(email).getImageUrl());
		return vm;
	}
	
	public ProductVM convertProductToVM(final Product product) {
		final ProductVM vm = new ProductVM();
		vm.setId(product.getId());
		final Brand brand = product.getBrand();
		vm.setBrandName(brand.getBrandName());
		final Category category = product.getCategory();
		vm.setStoreId(product.getStore().getId());
		vm.setCategoryName(category.getCategoryName());
		vm.setBrandId(brand.getId());
		vm.setCategoryId(category.getId());
		vm.setPrice(product.getPrice());
		vm.setProductName(product.getProductName());
		vm.setDescription(product.getDescription());
		vm.setProductImages(product.getProductImages().stream().map(it -> new ProductImageVM(it.getId(), it.getImage()))
				.collect(Collectors.toSet()));
		vm.setProductDetails(product.getProductDetails().stream().map(it -> {
			final Color color = it.getColor();
			final Size size = it.getSize();
			return new ProductDetailVM(it.getId(), size.getId(), size.getSizeName(), color.getId(),
					color.getColorName(), color.getcolorCode(), it.getQuantity());
		}).collect(Collectors.toSet()));
		vm.setComments(product.getComments().stream()
				.filter(i -> i.getEmail() != null && StringUtils.isNotEmpty(i.getContent()))
				.sorted(Comparator.comparing(Comment::getCreatedAt).reversed()).map(it -> convertToVM(it))
				.collect(Collectors.toList()));
		return vm;
	}

	@Override
	public boolean isAdmin() {
		final UserContext context = getUserContext();
		return context != null ? AccountType.ADMIN == context.getType() : false;
	}

}
