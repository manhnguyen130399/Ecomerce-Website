package com.fashion.modules.size.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashion.domain.UserContext;
import com.fashion.modules.size.domain.Size;
import com.fashion.modules.size.model.SizeVM;
import com.fashion.modules.size.repository.SizeRepository;
import com.fashion.modules.size.service.SizeService;
import com.fashion.modules.store.domain.Store;
import com.fashion.service.impl.BaseService;

@Service
public class SizeServiceImpl  extends BaseService implements SizeService{

	@Autowired
	private SizeRepository sizeRepo;
	
	@Override
	@Transactional
	public SizeVM createSize(final SizeVM size) {
		final UserContext userContext = getUserContext();
		final Store store = getStore(userContext);
		final Size sizeData = mapper.map(size, Size.class);
		sizeData.setCreatedBy(userContext.getUsername());
		final Set<Size> sizes = store.getSizes();
		sizes.add(sizeData);
		store.setSizes(sizes);
		return mapper.map(sizeData, SizeVM.class);
	}

	@Override
	@Transactional
	public SizeVM findById(final Integer id) {

		return mapper.map(sizeRepo.findOneByIdAndStoreId(id, getStore(getUserContext()).getId()), SizeVM.class);
	}

	@Override
	@Transactional
	public List<SizeVM> findAllByStore() {
		return sizeRepo.findAllByStoreId(getStore(getUserContext()).getId()).stream()
				.map(it -> mapper.map(it, SizeVM.class)).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void deleteSize(final Integer id) {
		final Integer storeId = getStore(getUserContext()).getId();
		final List<Size> sizes = sizeRepo.findAllByStoreId(storeId);
		final Size size = sizeRepo.findOneByIdAndStoreId(id, storeId);
		final Store store = getStore(getUserContext());
		store.setSizes(sizes.stream().filter(it->!it.equals(size)).collect(Collectors.toSet()));
	}

}
