package com.fashion.modules.brand.service;

import java.util.List;

import com.fashion.modules.brand.model.BrandVM;

public interface BrandService {
	
	BrandVM createBrand(BrandVM req);

	BrandVM findById(Integer id);

	List<BrandVM> findAllByStore();

	void deleteBrand(Integer id);

}
