package com.fashion.modules.size.service;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.SortEnum;
import com.fashion.modules.size.model.SizeVM;

public interface SizeService {

	SizeVM createSize(SizeVM size);

	SizeVM findById(Integer id);

	Page<SizeVM> findAllByStore(Integer page, Integer pageSize, String sizeName, SortEnum sortOrder, String sortField);

	void deleteSize(Integer id);

	Page<SizeVM> searchByKeyword(String keyword, Integer page, Integer pageSize, SortEnum sortOrder, String sortField);

}
