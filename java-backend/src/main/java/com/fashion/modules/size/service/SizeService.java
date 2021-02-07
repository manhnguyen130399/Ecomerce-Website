package com.fashion.modules.size.service;

import java.util.List;

import com.fashion.modules.size.model.SizeVM;

public interface SizeService {

	SizeVM createSize(SizeVM size);

	SizeVM findById(Integer id);

	List<SizeVM> findAllByStore();

	void deleteSize(Integer id);

}
