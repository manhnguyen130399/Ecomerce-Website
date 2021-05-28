package com.fashion.modules.color.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
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
	@CacheEvict(value = Constants.COLORS, allEntries = true)
	public ColorVM createColor(final ColorVM vm) {
		final UserContext context = getUserContext();
		final Store store = getStore(context);
		final Integer id = vm.getId();
		final boolean isNotNull = id != null;
		final Color color = isNotNull ? colorRepo.getOne(id) : new Color();
		if (!isNotNull) {
			color.setColorName(vm.getColorName());
			color.setCreatedBy(context.getUsername());
			color.setcolorCode(vm.getColorCode());
			colorRepo.save(color);
		}
		color.setStores(Collections.singleton(store));
		return mapper.map(color, ColorVM.class);
	}

	@Override
	@Transactional
	public ColorVM findById(final Integer id) {
		return mapper.map(colorRepo.findOneByIdAndStore(id, getCurrentStoreId()), ColorVM.class);
	}

	@Override
	@Transactional
	public Page<ColorVM> findByAllStore(final String colorName, final SortType sortOrder, final String sortField,
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
	@CacheEvict(value = Constants.COLORS, allEntries = true)
	public ColorVM deleteColor(final Integer id, final String colorName, final SortType sortOrder,
			final String sortField, final Integer page, final Integer pageSize) {
		final Integer currentStoreId = getCurrentStoreId();
		final Store store = getStore(getUserContext());
		final Color color = colorRepo.findOneByIdAndStore(id, currentStoreId);
		color.getStores().remove(store);
		final List<ColorVM> content = findByAllStore(colorName, sortOrder, sortField, page, pageSize).getContent();
		if (CollectionUtils.isEmpty(content)) {
			return null;
		}
		final ColorVM last = Iterables.getLast(content);
		return id != last.getId() ? last : null;
	}

	@Override
	@Transactional
	@Cacheable(value = Constants.COLORS)
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
	public Set<ColorVM> getAllColor() {
		return colorRepo.findAll().stream().map(it -> mapper.map(it, ColorVM.class)).collect(Collectors.toSet());
	}

}
