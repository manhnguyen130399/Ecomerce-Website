package com.fashion.modules.complain.service;

import org.springframework.data.domain.Page;

import com.fashion.modules.complain.model.ComplainRequest;
import com.fashion.modules.complain.model.ComplainVM;

public interface ComplainService {
	
	ComplainVM complain(ComplainRequest req);

	ComplainVM getComplain(Integer id);

	Page<ComplainVM> getComplainByStore(Integer page, Integer pageSize);

	ComplainVM reply(Integer id, String message);

}
