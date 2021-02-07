package com.fashion.modules.color.service;

import java.util.List;

import com.fashion.modules.color.model.ColorVM;

public interface ColorService {
	
	ColorVM createColor(ColorVM vm);
	
	ColorVM findById(Integer id);
	
	List<ColorVM> findByAllStore();
	
	void deleteColor(Integer id);

}
