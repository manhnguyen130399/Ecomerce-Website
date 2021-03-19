package com.fashion.modules.complain.service;

import org.springframework.data.domain.Page;

import com.fashion.commons.enums.SortType;
import com.fashion.modules.complain.model.ComplainRequest;
import com.fashion.modules.complain.model.ComplainVM;

public interface ComplainService {
	
	ComplainVM complain(ComplainRequest req);

	ComplainVM getComplain(Integer id);

	Page<ComplainVM> getComplainByStore(Integer page, Integer pageSize, SortType sortOrder, String sortField,
			String keyword);

	ComplainVM reply(Integer id, String message);
	
	Page<ComplainVM> searchComplainByKeyword(String keyword, Integer page, Integer pageSize);

}
