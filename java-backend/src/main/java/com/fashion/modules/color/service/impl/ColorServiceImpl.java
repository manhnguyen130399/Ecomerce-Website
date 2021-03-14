package com.fashion.modules.color.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fashion.commons.enums.SortEnum;
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
	public ColorVM createColor(final ColorVM vm) {
		final UserContext context = getUserContext();
		final Store store = getStore(context);
		final Color color = new Color();
		color.setColorName(vm.getColorName());
		color.setCreatedBy(context.getUsername());
		color.setStores(Collections.singleton(store));
		colorRepo.save(color);
		return mapper.map(color, ColorVM.class);
	}

	@Override
	@Transactional
	public ColorVM findById(final Integer id) {

		return mapper.map(colorRepo.findOneByIdAndStore(id, getStore(getUserContext()).getId()), ColorVM.class);
	}

	@Override
	@Transactional
	public Page<ColorVM> findByAllStore(final String colorName, final SortEnum sortOrder, final String sortField,
			final Integer page, final Integer pageSize) {

		if (StringUtils.isEmpty(colorName)) {
			return colorRepo
					.findAllByStore(getStore(getUserContext()).getId(),
							PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
					.map(it -> mapper.map(it, ColorVM.class));
		}
		return searchColorByKeywordAndStore(colorName, sortOrder, sortField, page, pageSize);
	}

	@Override
	@Transactional
	public ColorVM deleteColor(final Integer id, final String colorName, final SortEnum sortOrder,
			final String sortField, final Integer page, final Integer pageSize) {
		final Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
		final Color color = colorRepo.findOneByIdAndStore(id, getStore(getUserContext()).getId());
		final Page<Color> colors = colorRepo.findAllByStore(getStore(getUserContext()).getId(), pageable);
		final Store store = getStore(getUserContext());
		store.setColors(colors.getContent().stream().filter(it -> !it.equals(color)).collect(Collectors.toSet()));
		final List<ColorVM> content = findByAllStore(colorName, sortOrder, sortField, page, pageSize).getContent();
		final ColorVM last = Iterables.getLast(content);
		return CollectionUtils.isNotEmpty(content) && id != last.getId() ? last : null;

	}

	@Override
	@Transactional
	public Page<ColorVM> searchColorByKeywordAndStore(final String colorName, final SortEnum sortOrder,
			final String sortField, final Integer page, final Integer pageSize) {
		return colorRepo
				.searchByKeywordAndStore(colorName, getStore(getUserContext()).getId(),
						PageRequest.of(page, pageSize, CommonUtil.sortCondition(sortOrder, sortField)))
				.map(it -> mapper.map(it, ColorVM.class));
	}

}
