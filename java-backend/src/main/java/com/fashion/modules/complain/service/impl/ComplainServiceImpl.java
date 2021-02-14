package com.fashion.modules.complain.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.ComplainEnum;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.complain.domain.Complain;
import com.fashion.modules.complain.model.ComplainRequest;
import com.fashion.modules.complain.model.ComplainVM;
import com.fashion.modules.complain.repository.ComplainRepository;
import com.fashion.modules.complain.service.ComplainService;
import com.fashion.modules.store.domain.Store;
import com.fashion.modules.store.repository.StoreRepository;
import com.fashion.service.impl.BaseService;

@Service
public class ComplainServiceImpl extends BaseService implements ComplainService {
	
	@Autowired
	private ComplainRepository complainRepo;
	
	@Autowired
	private StoreRepository storeRepo;
	
	@Autowired
	private JavaMailSender mailSender;
	

	@Override
	@Transactional
	public ComplainVM complain(final ComplainRequest req) {
		final Store store = storeRepo.findByStoreNameLike(req.getStoreName());
		if (store == null) {
			throw new InvalidArgumentException(" Can't found store. Try again. ");
		}
		final Complain complain = new Complain();
		complain.setContent(req.getContent());
		final String email = req.getEmail();
		complain.setEmail(email != null ? email : getUserContext().getUsername());
		complain.setStore(store);
		complain.setState(ComplainEnum.PENDING);
		return mapper.map(complainRepo.save(complain), ComplainVM.class);
	}

	@Override
	@Transactional
	public ComplainVM getComplain(final Integer id) {
		return mapper.map(complainRepo.findOneById(id), ComplainVM.class);
	}

	@Override
	@Transactional
	public List<ComplainVM> getComplainByStore() {
		return complainRepo.findComplainByStoreId(getStore(getUserContext()).getId()).stream()
				.map(it -> mapper.map(it, ComplainVM.class)).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public ComplainVM reply(final Integer id, final String message) {
		final Complain complain = complainRepo.findOneById(id);
		if (complain == null) {
			throw new InvalidArgumentException(" Can't found complain.");
		}
		final SimpleMailMessage content = new SimpleMailMessage();
		content.setTo(complain.getEmail());
		content.setSubject(Constants.COMPLAIN_TITLE);
		content.setText(message + Constants.THANK_YOU_COMPLAIN);
		mailSender.send(content);
		complain.setState(ComplainEnum.RESPONSE);
		return mapper.map(complain, ComplainVM.class);
	}

}
