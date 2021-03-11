package com.fashion.modules.brand.service;

import org.springframework.data.domain.Page;

import com.fashion.modules.brand.model.BrandVM;

public interface BrandService {
	
	BrandVM createBrand(BrandVM req);

	BrandVM findById(Integer id);

	Page<BrandVM> findAllByStore(Integer page, Integer pageSize);

	void deleteBrand(Integer id);
	
	Page<BrandVM> seachBrandByStoreAndKeyword(String keyword, Integer page, Integer pageSize);

}
