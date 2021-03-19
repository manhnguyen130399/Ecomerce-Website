package com.fashion.modules.size.service;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.SortType;
import com.fashion.modules.size.model.SizeVM;

public interface SizeService {

	SizeVM createSize(SizeVM size);

	SizeVM findById(Integer id);

	Page<SizeVM> findAllByStore(Integer page, Integer pageSize, String sizeName, SortType sortOrder, String sortField);

	SizeVM deleteSize(Integer id, Integer page, Integer pageSize, String sizeName, SortType sortOrder,
			String sortField);

	Page<SizeVM> searchByKeyword(String keyword, Integer page, Integer pageSize, SortType sortOrder, String sortField);

}
