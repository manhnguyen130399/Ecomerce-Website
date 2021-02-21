package com.fashion.modules.color.service;

import org.springframework.data.domain.Page;

import com.fashion.modules.color.model.ColorVM;

public interface ColorService {
	
	ColorVM createColor(ColorVM vm);
	
	ColorVM findById(Integer id);
	
	Page<ColorVM> findByAllStore(Integer page, Integer pageSize);
	
	void deleteColor(Integer id);

}
