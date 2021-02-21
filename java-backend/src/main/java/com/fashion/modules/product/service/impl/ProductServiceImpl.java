package com.fashion.modules.product.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.brand.repository.BrandRepository;
import com.fashion.modules.category.domain.Category;
import com.fashion.modules.category.repository.CategoryRepository;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.domain.ProductDetail;
import com.fashion.modules.product.domain.ProductImage;
import com.fashion.modules.product.model.ProductReq;
import com.fashion.modules.product.model.ProductRes;
import com.fashion.modules.product.model.ProductVM;
import com.fashion.modules.product.repository.ProductDetailRepository;
import com.fashion.modules.product.repository.ProductRepository;
import com.fashion.modules.product.service.ProductService;
import com.fashion.modules.store.domain.Store;
import com.fashion.service.impl.BaseService;

import io.jsonwebtoken.lang.Collections;

@Service
public class ProductServiceImpl extends BaseService implements ProductService {

	@Autowired
	private CategoryRepository categoryRepo;
	
	@Autowired
	private BrandRepository brandRepo;
	
	@Autowired
	private ProductRepository productRepo;
	
	@Autowired
	private ProductDetailRepository productDetailRepo;
	
	@Override
	@Transactional
	public ProductVM createProduct(final ProductReq req) {
		final Store store = getStore(getUserContext());
		final Integer storeId = store.getId();
		final Category category = categoryRepo.findOneByIdAndStoreId(req.getCategoryId(), storeId);
		if(category ==null ) {
			throw new InvalidArgumentException(" Can't found category ");
		}
		final Product product = new Product();
		product.setPrice(req.getPrice());
		product.setStore(store);
		product.setProductName(req.getProductName());
		req.getProductImages().stream().forEach(it -> it.setProduct(product));
		product.setProductImages(req.getProductImages());
		product.setBrand(brandRepo.findOneByIdAndStoreId(req.getBrandId(), storeId));
		product.setCategory(category);
		req.getProductDetails().stream().forEach(it -> it.setProduct(product));
		product.setProductDetails(req.getProductDetails());
		return mapper.map(productRepo.save(product), ProductVM.class);
	}

	@Override
	@Transactional
	public ProductVM findById(final Integer id) {
		return mapper.map(productRepo.findOneProductByIdAndStore(id, getStore(getUserContext()).getId()),
				ProductVM.class);
	}

	@Override
	@Transactional
	public ProductVM updateProduct(final ProductReq req) {
		final Store store = getStore(getUserContext());
		final Integer storeId = store.getId();
		final Product product = productRepo.findOneProductByIdAndStore(req.getId(), storeId);
		if (product == null) {
			throw new NullPointerException("Not found product ");
		}
		final Category category = categoryRepo.findOneByIdAndStoreId(req.getCategoryId(), storeId);
		product.setPrice(req.getPrice());
		product.setStore(store);
		product.setProductName(req.getProductName());
		final Set<ProductImage> productImages = req.getProductImages();
		if (!io.jsonwebtoken.lang.Collections.isEmpty(productImages)) {
			productImages.stream().forEach(it -> it.setProduct(product));
			product.setProductImages(productImages);
		}
		final Set<ProductDetail> productDetails = req.getProductDetails();
		if (Collections.isEmpty(productDetails)) {
			productDetails.stream().forEach(it -> it.setProduct(product));
			product.setProductDetails(productDetails);
		}
		product.setBrand(brandRepo.findOneByIdAndStoreId(req.getBrandId(), storeId));
		product.setCategory(category);
		productRepo.save(product);
		return mapper.map(product, ProductVM.class);
	}

	@Override
	public ProductVM updateImageProduct(final List<MultipartFile> files, final Integer productId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public void deleteProduct(final Integer id) {
		productRepo.deleteById(id);
	}

	@Override
	@Transactional
	public List<ProductVM> getAllProductByStore() {
		return productRepo.findAllProductStore(getStore(getUserContext()).getId()).stream()
				.map(it -> mapper.map(it, ProductVM.class)).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public List<ProductRes> getProductDetailInfos(final List<Integer> ids) {
		return productDetailRepo.getProductDetailByIds(ids).stream().map(it -> {
			final ProductRes res = new ProductRes();
			final Product product = it.getProduct();
			res.setProductId(product.getId());
			res.setBrandName(product.getBrand().getBrandName());
			res.setProductDetailId(it.getId());
			res.setColorName(it.getColor().getColorName());
			res.setSizeName(it.getSize().getSizeName());
			res.setPrice(product.getPrice());
			res.setProductName(product.getProductName());
			return res;
		}).collect(Collectors.toList());
	}

}
