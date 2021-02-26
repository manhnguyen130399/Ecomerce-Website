package com.fashion.modules.size.service;

import org.springframework.data.domain.Page;

import com.fashion.modules.size.model.SizeVM;

public interface SizeService {

	SizeVM createSize(SizeVM size);

	SizeVM findById(Integer id);

	Page<SizeVM> findAllByStore(Integer page, Integer pageSize);

	void deleteSize(Integer id);

}
