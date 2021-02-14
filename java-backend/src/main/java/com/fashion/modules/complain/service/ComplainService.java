package com.fashion.modules.complain.service;

import java.util.List;

import com.fashion.modules.complain.model.ComplainRequest;
import com.fashion.modules.complain.model.ComplainVM;

public interface ComplainService {
	
	ComplainVM complain(ComplainRequest req);

	ComplainVM getComplain(Integer id);

	List<ComplainVM> getComplainByStore();

	ComplainVM reply(Integer id, String message);

}
