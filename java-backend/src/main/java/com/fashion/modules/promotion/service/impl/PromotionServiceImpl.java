package com.fashion.modules.promotion.service.impl;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.promotion.domain.Promotion;
import com.fashion.modules.promotion.model.PromotionRequest;
import com.fashion.modules.promotion.model.PromotionVM;
import com.fashion.modules.promotion.model.QrVM;
import com.fashion.modules.promotion.repository.PromotionRepository;
import com.fashion.modules.promotion.service.PromotionService;
import com.fashion.modules.store.domain.Store;
import com.fashion.modules.store.repository.StoreRepository;
import com.fashion.service.impl.BaseService;
import com.fashion.service.impl.GoogleDriveService;
import com.google.api.client.util.Maps;

@Service
public class PromotionServiceImpl extends BaseService implements PromotionService {

	@Autowired
	private PromotionRepository promoRepo;

	@Autowired
	private StoreRepository storeRepo;

	@Autowired
	private GoogleDriveService drive;

	@Override
	@Transactional
	public PromotionVM createPromotion(final PromotionRequest req) throws Exception {
		final Store store = storeRepo.findOneById(getStore(getUserContext()).getId());
		if (store == null) {
			throw new InvalidArgumentException(" Can't found store ");
		}
		final SimpleDateFormat formatter = new SimpleDateFormat(Constants.DATE_FORMAT_YYYYMMDD_HYPHEN);
		final String storeName = store.getStoreName();
		final String text = String.join(Constants.END_LINE, Constants.CODE_PROMOTION + Constants.BLANK + req.getCode(),
				Constants.START_DATE + Constants.BLANK + formatter.format(req.getStartDate()),
				Constants.END_DATE + Constants.BLANK + formatter.format(req.getEndDate()),
				Constants.DISCOUNT + Constants.BLANK + req.getDiscount() + Constants.PERCENT,
				Constants.STORE + Constants.BLANK + storeName,
				Constants.WEBSITE + Constants.BLANK + store.getWebsite());
		final File file = CommonUtil.QrCodeToFile(CommonUtil.generateQrCode(text, null), storeName);
		final Map<String, String> res = Maps.newHashMap();
		res.put(CommonUtil.customToSimpleThymleafVariable(Constants.FILE_ID), drive.uploadFile(file));
		file.delete();
		final Promotion promotion = new Promotion();
		try {
			mapper.map(req, promotion);
			promotion.setQrCode(CommonUtil.replaceContextParam(Constants.URL_VIEW_FILE, res));
			promotion.setStore(store);
			promoRepo.save(promotion);
		} catch (Exception e) {
			throw new InvalidArgumentException(" Duplicated code ");
		}
		return mapper.map(promotion, PromotionVM.class);
	}

	@Override
	@Transactional
	public PromotionVM findPromotionById(final Integer id) {
		return mapper.map(promoRepo.findOneById(id), PromotionVM.class);
	}

	@Override
	@Transactional
	public Page<PromotionVM> getAllPromotionByStore(final Integer page, final Integer pageSize) {
		return promoRepo.findAllByStore(getStore(getUserContext()).getId(), PageRequest.of(page, pageSize))
				.map(it -> mapper.map(it, PromotionVM.class));
	}

	@Override
	@Transactional
	public void deletePromotion(final Integer id) {
		promoRepo.deleteById(id);
	}

	@Override
	@Transactional
	public List<QrVM> getPromotionValidDate() throws ParseException {
		final Calendar from = Calendar.getInstance();
		from.add(Calendar.DATE, 6);
		from.set(Calendar.HOUR, 12);
		from.set(Calendar.MINUTE, 0);
		from.set(Calendar.SECOND, 0);
		from.set(Calendar.MILLISECOND, 0);
		final Calendar to = Calendar.getInstance();
		to.add(Calendar.DATE, 7);
		to.set(Calendar.HOUR, 12);
		to.set(Calendar.MINUTE, 0);
		to.set(Calendar.SECOND, 0);
		to.set(Calendar.MILLISECOND, 0);
		return promoRepo.findPromotionValidDate(from.getTime(), to.getTime()).stream()
				.map(it -> mapper.map(it, QrVM.class)).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public String getDiscountPromtion(final String code) {
		final Promotion promotion = promoRepo.findOnePromotionByCode(code);
		final Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.HOUR, 12);
		calendar.set(Calendar.MINUTE, 1);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		final Date now = calendar.getTime();
		if (promotion == null) {
			throw new InvalidArgumentException(" Promotion not found ");
		} else if (promotion.getStartDate().after(now) || promotion.getEndDate().before(now)) {
			throw new InvalidArgumentException(" Can't use promotion. Start date or end date invalid. ");

		} else {
			return promotion.getDiscount().toString() + Constants.PERCENT;
		}

	}

	@Override
	@Transactional
	public Page<PromotionVM> searchPromotionByKeywordAndStore(final String keyword, final Integer page,
			final Integer pageSize) {
		return promoRepo
				.searchByKeywordAndStore(keyword, getStore(getUserContext()).getId(), PageRequest.of(page, pageSize))
				.map(it -> mapper.map(it, PromotionVM.class));
	}

}
