package com.fashion.modules.color.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashion.domain.UserContext;
import com.fashion.modules.color.domain.Color;
import com.fashion.modules.color.model.ColorVM;
import com.fashion.modules.color.repository.ColorRepository;
import com.fashion.modules.color.service.ColorService;
import com.fashion.modules.store.domain.Store;
import com.fashion.service.impl.BaseService;

@Service
public class ColorServiceImpl extends BaseService implements ColorService{

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
		final Set<Color> colors = store.getColors();
		colors.add(color);
		store.setColors(colors);
		return mapper.map(color, ColorVM.class);
	}

	@Override
	@Transactional
	public ColorVM findById(final Integer id) {

		return mapper.map(colorRepo.findOneByIdAndStore(id, getStore(getUserContext()).getId()), ColorVM.class);
	}

	@Override
	@Transactional
	public List<ColorVM> findByAllStore() {

		return colorRepo.findAllByStore(getStore(getUserContext()).getId()).stream()
				.map(it -> mapper.map(it, ColorVM.class)).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void deleteColor(final Integer id) {
		final Color color = colorRepo.findOneByIdAndStore(id, getStore(getUserContext()).getId());
		final List<Color> colors = colorRepo.findAllByStore(getStore(getUserContext()).getId());
		final Store store = getStore(getUserContext());
		store.setColors(colors.stream().filter(it -> !it.equals(color)).collect(Collectors.toSet()));

	}

}
