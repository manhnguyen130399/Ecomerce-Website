package com.fashion.modules.brand.service;


import java.util.Set;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.SortType;
import com.fashion.modules.brand.model.BrandVM;

public interface BrandService {

	BrandVM createBrand(BrandVM req);

	BrandVM findById(Integer id);

	Page<BrandVM> getBrands(Integer page, Integer pageSize, String brandName, SortType sortOrder,
			String sortField);

	BrandVM deleteBrand(Integer id, Integer page, Integer pageSize, String brandName, SortType sortOrder,
			String sortField);

	Page<BrandVM> seachBrandByStoreAndKeyword(String brandName, SortType sortOrder, Integer page, Integer pageSize,
			String sortField);
	Set<BrandVM>getBrands();

}
