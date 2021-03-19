package com.fashion.modules.color.service;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.SortType;
import com.fashion.modules.color.model.ColorVM;

public interface ColorService {

	ColorVM createColor(ColorVM vm);

	ColorVM findById(Integer id);

	Page<ColorVM> findByAllStore(String colorName, SortType sortOrder, String sortField, Integer page,
			Integer pageSize);

	ColorVM deleteColor(Integer id, String colorName, SortType sortOrder, String sortField, Integer page,
			Integer pageSize);

	Page<ColorVM> searchColorByKeywordAndStore(String colorName, SortType sortOrder, String sortField, Integer page,
			Integer pageSize);

}
