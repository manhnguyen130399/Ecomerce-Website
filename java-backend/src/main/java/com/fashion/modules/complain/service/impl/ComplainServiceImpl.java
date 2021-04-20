package com.fashion.modules.complain.service.impl;

import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.ComplainType;
import com.fashion.commons.enums.SortType;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.complain.domain.Complain;
import com.fashion.modules.complain.model.ComplainRequest;
import com.fashion.modules.complain.model.ComplainVM;
import com.fashion.modules.complain.repository.ComplainRepository;
import com.fashion.modules.complain.service.ComplainService;
import com.fashion.service.impl.BaseService;

@Service
public class ComplainServiceImpl extends BaseService implements ComplainService {

	@Autowired
	private ComplainRepository complainRepo;

	@Autowired
	private JavaMailSender mailSender;

	@Override
	@Transactional
	public ComplainVM complain(final ComplainRequest req) {
		final Complain complain = new Complain();
		complain.setContent(req.getContent());
		final String email = req.getEmail();
		complain.setEmail(email != null ? email : getUserContext().getUsername());
		complain.setState(ComplainType.PENDING);
		complain.setName(req.getName());
		complain.setPhone(req.getPhone());
		return mapper.map(complainRepo.save(complain), ComplainVM.class);
	}

	@Override
	@Transactional
	public ComplainVM getComplain(final Integer id) {
		return mapper.map(complainRepo.findOneById(id), ComplainVM.class);
	}

	@Override
	@Transactional
	public Page<ComplainVM> getComplainByStore(final Integer page, final Integer pageSize, final SortType sortOrder,
			final String sortField, final String keyword) {
		final Pageable pageable = PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField));
		if (StringUtils.isEmpty(keyword)) {
			return complainRepo.findAll(pageable).map(it -> mapper.map(it, ComplainVM.class));
		} else {
			return searchComplainByKeyword(keyword, page, pageSize);
		}
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
		content.setText(message + Constants.THANK_YOU);
		mailSender.send(content);
		complain.setState(ComplainType.RESPONSE);
		return mapper.map(complain, ComplainVM.class);
	}

	@Override
	@Transactional
	public Page<ComplainVM> searchComplainByKeyword(final String keyword, final Integer page, final Integer pageSize) {
		return complainRepo.searchComplainByKeyword(keyword, PageRequest.of(page, pageSize))
				.map(it -> mapper.map(it, ComplainVM.class));
	}

}
