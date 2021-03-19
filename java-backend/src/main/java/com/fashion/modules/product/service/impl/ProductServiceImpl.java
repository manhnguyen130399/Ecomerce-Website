package com.fashion.modules.product.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fashion.commons.enums.SortType;
import com.fashion.exception.InvalidArgumentException;
import com.fashion.modules.brand.domain.Brand;
import com.fashion.modules.brand.repository.BrandRepository;
import com.fashion.modules.category.domain.Category;
import com.fashion.modules.category.repository.CategoryRepository;
import com.fashion.modules.color.domain.Color;
import com.fashion.modules.color.repository.ColorRepository;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.domain.ProductDetail;
import com.fashion.modules.product.domain.ProductImage;
import com.fashion.modules.product.model.ProductDetailVM;
import com.fashion.modules.product.model.ProductImageVM;
import com.fashion.modules.product.model.ProductReq;
import com.fashion.modules.product.model.ProductRes;
import com.fashion.modules.product.model.ProductVM;
import com.fashion.modules.product.repository.ProductDetailRepository;
import com.fashion.modules.product.repository.ProductRepository;
import com.fashion.modules.product.service.ProductService;
import com.fashion.modules.size.domain.Size;
import com.fashion.modules.size.repository.SizeRepository;
import com.fashion.modules.store.domain.Store;
import com.fashion.service.impl.BaseService;
import com.google.common.collect.Iterables;

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

	@Autowired
	private ColorRepository colorRepo;

	@Autowired
	private SizeRepository sizeRepo;

	@Override
	@Transactional
	public ProductVM createProduct(final ProductReq req) {
		final Store store = getStore(getUserContext());
		final Integer storeId = store.getId();
		final Category category = categoryRepo.findOneByIdAndStoreId(req.getCategoryId(), storeId);
		if (category == null) {
			throw new InvalidArgumentException(" Can't found category ");
		}
		final Product product = new Product();
		product.setPrice(req.getPrice());
		product.setStore(store);
		product.setProductName(req.getProductName());
		final Brand brand = brandRepo.findOneByIdAndStoreId(req.getBrandId(), storeId);
		if (brand == null) {
			throw new InvalidArgumentException(" Can't found brand ");
		}
		product.setBrand(brand);
		product.setCategory(category);
		final List<String> productImages = req.getImages();
		if (CollectionUtils.isNotEmpty(productImages)) {
			product.setProductImages(req.getImages().parallelStream().map(it -> {
				return new ProductImage(it, product);
			}).collect(Collectors.toSet()));
		}
		final Set<ProductDetailVM> productDetails = req.getProductDetails();

		if (CollectionUtils.isNotEmpty(productDetails)) {
			product.setProductDetails(productDetails.parallelStream().map(it -> {
				final Size size = sizeRepo.findOneByIdAndStoreId(it.getSizeId(), storeId);
				final Color color = colorRepo.findOneByIdAndStore(it.getColorId(), storeId);
				if (size == null) {
					throw new InvalidArgumentException(" Size doesn't exit ");
				}
				if (color == null) {
					throw new InvalidArgumentException(" Color doesn't exit ");
				}
				return new ProductDetail(it.getQuantity(), product, size, color);
			}).collect(Collectors.toSet()));
		}
		productRepo.save(product);
		return convertToVM(product);
	}

	private ProductVM convertToVM(final Product product) {
		final ProductVM vm = new ProductVM();
		vm.setId(product.getId());
		final Brand brand = product.getBrand();
		vm.setBrandName(brand.getBrandName());
		final Category category = product.getCategory();
		vm.setCategoryName(category.getCategoryName());
		vm.setBrandId(brand.getId());
		vm.setCategoryId(category.getId());
		vm.setPrice(product.getPrice());
		vm.setProductName(product.getProductName());
		vm.setProductImages(product.getProductImages().stream().map(it -> new ProductImageVM(it.getId(), it.getImage()))
				.collect(Collectors.toSet()));
		vm.setProductDetails(product.getProductDetails().stream().map(it -> {
			final Color color = it.getColor();
			final Size size = it.getSize();
			return new ProductDetailVM(size.getId(), size.getSizeName(), color.getId(), color.getColorName(),
					it.getQuantity());
		}).collect(Collectors.toSet()));
		return vm;
	}

	@Override
	@Transactional
	public ProductVM findById(final Integer id) {
		return convertToVM(productRepo.findOneProductByIdAndStore(id, getStore(getUserContext()).getId()));

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
		final List<String> productImages = req.getImages();
		if (CollectionUtils.isNotEmpty(productImages)) {
			product.setProductImages(req.getImages().parallelStream().map(it -> {
				return new ProductImage(it, product);
			}).collect(Collectors.toSet()));
		}
		final Set<ProductDetailVM> productDetails = req.getProductDetails();
		if (CollectionUtils.isNotEmpty(productDetails)) {
			product.setProductDetails(productDetails.parallelStream().map(it -> {
				final Size size = sizeRepo.findOneByIdAndStoreId(it.getSizeId(), storeId);
				final Color color = colorRepo.findOneByIdAndStore(it.getColorId(), storeId);
				if (size == null) {
					throw new InvalidArgumentException(" Size doesn't exit ");
				}
				if (color == null) {
					throw new InvalidArgumentException(" Color doesn't exit ");
				}
				return new ProductDetail(it.getQuantity(), product, size, color);
			}).collect(Collectors.toSet()));
		}
		product.setBrand(brandRepo.findOneByIdAndStoreId(req.getBrandId(), storeId));
		product.setCategory(category);
		productRepo.save(product);
		return convertToVM(product);
	}

	@Override
	public ProductVM updateImageProduct(final List<MultipartFile> files, final Integer productId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public Page<ProductVM> getAllProductByStore(final Integer page, final Integer pageSize, final ProductReq req) {
		if (req == null) {
			return productRepo.findAllProductStore(getStore(getUserContext()).getId(), PageRequest.of(page, pageSize))
					.map(it -> convertToVM(it));
		}
		return filterProduct(page, pageSize, req);

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

	@Override
	@Transactional
	public Page<ProductVM> searchProductByKeywordAndStore(final String keyword, final Integer page,
			final Integer pageSize) {
		return productRepo
				.searchByKeywordAndStore(keyword, getStore(getUserContext()).getId(), PageRequest.of(page, pageSize))
				.map(it -> convertToVM(it));
	}

	@Override
	@Transactional
	public Page<ProductVM> filterProduct(final Integer page, final Integer pageSize, final ProductReq req) {
		return productRepo.filterProduct(page, pageSize, getStore(getUserContext()).getId(), req)
				.map(it -> convertToVM(it));
	}

	@Override
	@Transactional
	public ProductVM deleteProduct(final Integer id, final Integer page, final Integer pageSize,
			final SortType sortOrder, final String sortField) {
		try {
			productRepo.deleteById(id);
			final Page<ProductVM> products = filterProduct(page, pageSize, new ProductReq(sortOrder, sortField));
			final List<ProductVM> content = products.getContent();
			if (CollectionUtils.isEmpty(content)) {
				return null;
			}
			return Iterables.getLast(content);
		} catch (Exception e) {
			if (e instanceof DataIntegrityViolationException) {
				throw new InvalidArgumentException(" Product existed in carts. You can't delete this.");
			}
			throw new InvalidArgumentException("Product not found ");

		}
	}

}
