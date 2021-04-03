package com.fashion.modules.product.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.beust.jcommander.internal.Lists;
import com.beust.jcommander.internal.Maps;
import com.fashion.commons.constants.Constants;
import com.fashion.commons.constants.ErrorMessage;
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
import com.fashion.modules.product.repository.ProductImageRepository;
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

	@Autowired
	private ProductImageRepository imageRepo;

	private static final String PRODUCT_NAME = "Product Name";
	private static final String PRICE = "Price";
	private static final String COLOR = "Color";
	private static final String SIZE = "Size";
	private static final String BRAND = "Brand";
	private static final String CATEGORY = "Category";
	private static final String QUANTITY = "Quantity";
	private static final String COLOR_HEX = "ColorHex";

	private static final List<String> HEADER = Lists.newArrayList(PRODUCT_NAME, PRICE, COLOR, COLOR_HEX, SIZE, BRAND,
			CATEGORY, QUANTITY);

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
					color.getColorHex(), it.getQuantity());
		}).collect(Collectors.toSet()));
		return vm;
	}

	@Override
	@Transactional
	public ProductVM findById(final Integer id) {
		return convertToVM(productRepo.findOneProductByIdAndStore(id, getCurrentStoreId()));
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
	@Transactional
	public Page<ProductVM> getAllProductByStore(final Integer page, final Integer pageSize, final ProductReq req) {
		if (req == null) {
			return productRepo.findAllProductStore(getCurrentStoreId(), PageRequest.of(page, pageSize))
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
			final Color color = it.getColor();
			res.setProductId(product.getId());
			res.setBrandName(product.getBrand().getBrandName());
			res.setProductDetailId(it.getId());
			res.setColorName(color.getColorName());
			res.setSizeName(it.getSize().getSizeName());
			res.setPrice(product.getPrice());
			res.setProductName(product.getProductName());
			res.setQuantity(it.getQuantity());
			res.setCategoryName(product.getCategory().getCategoryName());
			res.setColorHex(color.getColorHex());
			return res;
		}).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public Page<ProductVM> searchProductByKeywordAndStore(final String keyword, final Integer page,
			final Integer pageSize) {
		return productRepo.searchByKeywordAndStore(keyword, getCurrentStoreId(), PageRequest.of(page, pageSize))
				.map(it -> convertToVM(it));
	}

	@Override
	@Transactional
	public Page<ProductVM> filterProduct(final Integer page, final Integer pageSize, final ProductReq req) {
		return productRepo.filterProduct(page, pageSize, getCurrentStoreId(), req).map(it -> convertToVM(it));
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

	@Override
	@Transactional
	public String deleteImageProduct(final Integer productImageId) {
		try {
			imageRepo.deleteById(productImageId);
			return Constants.SUCCESS;
		} catch (Exception e) {
			throw new InvalidArgumentException(ErrorMessage.NOT_FOUND);
		}
	}

	@Override
	public List<ProductRes> readExcelFile(final MultipartFile file) {
		final List<ProductRes> products = Lists.newArrayList();
		try {
			final InputStream stream = file.getInputStream();
			final Workbook wb = getCorrectWorkbook(file.getName(), stream);
			final org.apache.poi.ss.usermodel.Sheet datatypeSheet = wb.getSheetAt(0);
			final Iterator<Row> iterator = datatypeSheet.iterator();
			iterator.next();
			final Row headerRow = iterator.next();
			final Map<String, Integer> colIndexs = getColIndex(headerRow, HEADER);
			while (iterator.hasNext()) {
				final Row row = iterator.next();
				products.add(transferToProduct(colIndexs, row));
			}
			stream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return products;
	}

	private ProductRes transferToProduct(final Map<String, Integer> colIndexs, final Row row) {
		final ProductRes vm = new ProductRes();
		vm.setProductName(row.getCell(colIndexs.get(PRODUCT_NAME)).getStringCellValue());
		vm.setPrice(BigDecimal.valueOf(row.getCell(colIndexs.get(PRICE)).getNumericCellValue()));
		vm.setBrandName(row.getCell(colIndexs.get(BRAND)).getStringCellValue());
		vm.setCategoryName(row.getCell(colIndexs.get(CATEGORY)).getStringCellValue());
		vm.setColorName(row.getCell(colIndexs.get(COLOR)).getStringCellValue());
		vm.setSizeName(row.getCell(colIndexs.get(SIZE)).getStringCellValue());
		vm.setQuantity((int) row.getCell(colIndexs.get(QUANTITY)).getNumericCellValue());
		vm.setColorHex(row.getCell(colIndexs.get(COLOR_HEX)).getStringCellValue());
		return vm;
	}

	private Map<String, Integer> getColIndex(final Row row, final Collection<String> headerTexts) {
		final Map<String, Integer> map = Maps.newHashMap();
		row.forEach(it -> {
			if (headerTexts.contains(it.getStringCellValue())) {
				map.put(it.getStringCellValue(), it.getColumnIndex());
			}
		});
		if (headerTexts.size() != map.keySet().size()) {
			throw new InvalidArgumentException("Please take a check header row.");
		}
		return map;
	}

	private Workbook getCorrectWorkbook(final String fileName, final InputStream stream) throws IOException {
		return WorkbookFactory.create(stream);
	}

	@Override
	@Transactional
	public List<ProductVM> createProducts(final List<ProductRes> products) {
		final Integer storeId = getCurrentStoreId();
		final PageRequest page = PageRequest.of(0, Integer.MAX_VALUE);
		final List<Color> colors = colorRepo.findAllByStore(storeId, page).getContent();
		final List<Size> sizes = sizeRepo.findAllByStoreId(storeId, page).getContent();
		final List<Brand> brands = brandRepo.findAllByStoreId(storeId, page).getContent();
		final List<Category> categories = categoryRepo.findAllByStoreId(storeId, page).getContent();
		final Pair<List<Color>, Set<String>> colorPair = Pair.of(colors,
				colors.stream().map(it -> it.getColorName()).collect(Collectors.toSet()));
		final Pair<List<Size>, Set<String>> sizePair = Pair.of(sizes,
				sizes.stream().map(it -> it.getSizeName()).collect(Collectors.toSet()));
		final Pair<List<Category>, Set<String>> categoryPair = Pair.of(categories,
				categories.stream().map(it -> it.getCategoryName()).collect(Collectors.toSet()));
		final Pair<List<Brand>, Set<String>> brandPair = Pair.of(brands,
				brands.stream().map(it -> it.getBrandName()).collect(Collectors.toSet()));
		final List<Product> res = products.stream()
				.map(it -> buildProductInternal(it, colorPair, sizePair, categoryPair, brandPair))
				.collect(Collectors.toList());
		return productRepo.saveAll(res).stream().map(it -> convertToVM(it)).collect(Collectors.toList());
	}

	private Product buildProductInternal(final ProductRes input, final Pair<List<Color>, Set<String>> colorPair,
			final Pair<List<Size>, Set<String>> sizePair, final Pair<List<Category>, Set<String>> categoryPair,
			final Pair<List<Brand>, Set<String>> brandPair) {
		Product product = productRepo.findByProductName(input.getProductName());
		if (product == null) {
			product = new Product();
			final Store store = getStore(getUserContext());
			final Set<Store> stores = Collections.singleton(store);
			product.setStore(store);
			product.setPrice(input.getPrice());
			product.setProductName(input.getProductName());
			final String brandName = input.getBrandName();
			final String sizeName = input.getSizeName();
			final String colorName = input.getColorName();
			final String categoryName = input.getCategoryName();
			product.setBrand(brandPair.getRight().contains(brandName)
					? brandPair.getLeft().stream().filter(it -> it.getBrandName().equals(brandName)).findFirst().get()
					: brandRepo.save(new Brand(brandName, stores)));
			product.setCategory(categoryPair.getRight().contains(categoryName)
					? categoryPair.getLeft().stream().filter(it -> it.getCategoryName().equals(categoryName))
							.findFirst().get()
					: categoryRepo.save(new Category(categoryName, stores)));
			final Color color = colorPair.getRight().contains(colorName)
					? colorPair.getLeft().stream().filter(it -> it.getColorName().equals(colorName)).findFirst().get()
					: colorRepo.save(new Color(colorName, stores, input.getColorHex()));
			final Size size = sizePair.getRight().contains(sizeName)
					? sizePair.getLeft().stream().filter(it -> it.getSizeName().equals(sizeName)).findFirst().get()
					: sizeRepo.save(new Size(sizeName, stores));
			product.setProductDetails(
					Collections.singleton(new ProductDetail(input.getQuantity(), product, size, color)));
		}
		return product;
	}

}
