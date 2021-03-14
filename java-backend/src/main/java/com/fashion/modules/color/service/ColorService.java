package com.fashion.modules.color.service;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.SortEnum;
import com.fashion.modules.color.model.ColorVM;

public interface ColorService {

	ColorVM createColor(ColorVM vm);

	ColorVM findById(Integer id);

	Page<ColorVM> findByAllStore(String colorName, SortEnum sortOrder, String sortField, Integer page,
			Integer pageSize);

	ColorVM deleteColor(Integer id, String colorName, SortEnum sortOrder, String sortField, Integer page,
			Integer pageSize);

	Page<ColorVM> searchColorByKeywordAndStore(String colorName, SortEnum sortOrder, String sortField, Integer page,
			Integer pageSize);

}
