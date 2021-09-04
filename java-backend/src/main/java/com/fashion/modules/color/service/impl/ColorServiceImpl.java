package com.fashion.modules.color.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.SortType;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.domain.UserContext;
import com.fashion.modules.color.domain.Color;
import com.fashion.modules.color.model.ColorVM;
import com.fashion.modules.color.repository.ColorRepository;
import com.fashion.modules.color.service.ColorService;
import com.fashion.modules.store.domain.Store;
import com.fashion.service.impl.BaseService;
import com.google.common.collect.Iterables;

@Service
public class ColorServiceImpl extends BaseService implements ColorService {

	@Autowired
	private ColorRepository colorRepo;

	@Override
	@Transactional
	@CachePut(value = Constants.COLORS, key = "#vm.colorCode")
	public ColorVM createColor(final ColorVM vm) {
		final UserContext context = getUserContext();
		final Store store = getStore(context);
		final Color existed = colorRepo.getByColorCode(vm.getColorCode());
		final boolean hasColor = existed != null;
		final Color color = hasColor ? existed : new Color();
		if (hasColor && store.getColors().contains(color)) {
			return mapper.map(color, ColorVM.class);
		}
		final Set<Store> stores = color.getStores();
		stores.add(store);
		color.setStores(stores);
		if (!hasColor) {
			color.setColorName(vm.getColorName());
			color.setCreatedBy(context.getUsername());
			color.setcolorCode(vm.getColorCode());
			colorRepo.save(color);
		}

		return mapper.map(color, ColorVM.class);
	}

	@Override
	@Transactional
	public ColorVM findById(final Integer id) {
		return mapper.map(colorRepo.findOneByIdAndStore(id, getCurrentStoreId()), ColorVM.class);
	}

	@Override
	@Transactional
	public Page<ColorVM> getColors(final String colorName, final SortType sortOrder, final String sortField,
			final Integer page, final Integer pageSize) {
		final PageRequest pageable = PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField));
		return !isAdmin() ? getColorsBySeller(colorName, sortOrder, sortField, page, pageSize)
				: getColorsByAdmin(CommonUtil.customLikeValueVariable(colorName), pageable);
	}

	private Page<ColorVM> getColorsByAdmin(final String colorName, final PageRequest pageable) {
		return StringUtils.isEmpty(colorName) ? colorRepo.findAll(pageable).map(it -> mapper.map(it, ColorVM.class))
				: colorRepo.getByColorNameLike(colorName, pageable).map(it -> mapper.map(it, ColorVM.class));
	}

	private Page<ColorVM> getColorsBySeller(final String colorName, final SortType sortOrder, final String sortField,
			final Integer page, final Integer pageSize) {
		if (StringUtils.isEmpty(colorName)) {
			return colorRepo
					.findAllByStore(getCurrentStoreId(),
							PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
					.map(it -> mapper.map(it, ColorVM.class));
		}
		return searchColorByKeywordAndStore(colorName, sortOrder, sortField, page, pageSize);
	}

	@Override
	@Transactional
	@CacheEvict(value = Constants.COLORS, key = "#id")
	public ColorVM deleteColor(final Integer id, final String colorName, final SortType sortOrder,
			final String sortField, final Integer page, final Integer pageSize) {
		if (!isAdmin()) {
			final Integer currentStoreId = getCurrentStoreId();
			final Store store = getStore(getUserContext());
			final Color color = colorRepo.findOneByIdAndStore(id, currentStoreId);
			color.getStores().remove(store);
		} else {
			colorRepo.deleteById(id);
		}
		final List<ColorVM> content = getColors(colorName, sortOrder, sortField, page, pageSize).getContent();
		if (CollectionUtils.isEmpty(content)) {
			return null;
		}
		final ColorVM last = Iterables.getLast(content);
		return id != last.getId() ? last : null;
	}

	@Override
	@Transactional
	public Page<ColorVM> searchColorByKeywordAndStore(final String colorName, final SortType sortOrder,
			final String sortField, final Integer page, final Integer pageSize) {
		return colorRepo
				.searchByKeywordAndStore(colorName, getStore(getUserContext()).getId(),
						PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, ColorVM.class));
	}

	@Override
	@Transactional
	@Cacheable(value = Constants.COLORS)
	public Set<ColorVM> getColors() {
		final Set<ColorVM> res = colorRepo.findAll().stream().map(it -> mapper.map(it, ColorVM.class))
				.collect(Collectors.toSet());
		final UserContext context = getUserContext();
		final Store store = context != null ? getStore(context) : null;
		if (store == null) {
			return res;
		}
		final List<ColorVM> content = getColors(StringUtils.EMPTY, SortType.ascend, Constants.FIELD_ID, 0,
				Integer.MAX_VALUE).getContent();
		return res.stream().filter(it -> !content.contains(it)).collect(Collectors.toSet());
	}

}
