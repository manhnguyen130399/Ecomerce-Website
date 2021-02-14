package com.fashion.modules.promotion.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.fashion.commons.utils.CommonUtil;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.account.repository.AccountRepository;
import com.fashion.modules.promotion.domain.Promotion;
import com.fashion.modules.promotion.model.PromotionRequest;
import com.fashion.modules.promotion.model.PromotionVM;
import com.fashion.modules.promotion.repository.PromotionRepository;
import com.fashion.modules.promotion.service.PromotionService;
import com.fashion.modules.store.domain.Store;
import com.fashion.modules.store.repository.StoreRepository;
import com.fashion.service.impl.BaseService;
import com.fashion.service.impl.GoogleDriveService;

@Service
public class PromotionServiceImpl extends BaseService implements PromotionService {

	@Autowired
	private PromotionRepository promoRepo;
	
	@Autowired
	private StoreRepository storeRepo;
	
	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private GoogleDriveService drive;

	@Override
	@Transactional
	public PromotionVM createPromotion(final PromotionRequest req) {
		final Store store = storeRepo.findOneById(getStore(getUserContext()).getId());
		if (store == null) {
			throw new InvalidArgumentException(" Can't found store ");
		}
		final Promotion promotion = new Promotion();
		mapper.map(req, promotion);
		promotion.setQrCode(CommonUtil.generateQrCode(req.getCode(), null));
		promotion.setStore(store);
		promoRepo.save(promotion);
		return mapper.map(promotion, PromotionVM.class);
	}

	@Override
	@Transactional
	public PromotionVM findPromotionById(final Integer id) {
		return mapper.map(promoRepo.findOneById(id), PromotionVM.class);
	}

	@Override
	@Transactional
	public List<PromotionVM> getAllPromotionByStore() {
		return promoRepo.findAllByStore(getStore(getUserContext()).getId()).stream()
				.map(it -> mapper.map(it, PromotionVM.class)).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void deletePromotion(final Integer id) {
		promoRepo.deleteById(id);
	}


}
