package com.fashion.modules.product.repository.custom.impl;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.TypedQuery;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.CustomerSortType;
import com.fashion.commons.enums.SortType;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.model.ProductFilterRequest;
import com.fashion.modules.product.model.ProductReq;
import com.fashion.modules.product.repository.custom.ProductRepositoryCustom;
import com.fashion.repository.BaseRepository;

@Repository
public class ProductRepositoryCustomImpl extends BaseRepository implements ProductRepositoryCustom {

	@Override
	public Page<Product> filterProduct(final Integer page, final Integer pageSize, final Integer storeId,
			final ProductReq req) {
		final String productName = req.getProductName();
		final boolean hasProduct = productName != null;
		final String categoryName = req.getCategoryName();
		final boolean hasCategory = categoryName != null;
		final String brandName = req.getBrandName();
		final boolean hasBrand = brandName != null;
		final BigDecimal price = req.getPrice();
		final boolean hasPrice = price != null;
		final String sortField = req.getSortField();
		final boolean hasSortField = sortField != null;
		final String sortOrder = SortType.descend.equals(req.getSortOrder()) ? Constants.DESC : Constants.ASC;
		final StringBuilder builder = new StringBuilder();
		builder.append(" SELECT p ");
		builder.append(" FROM Product p ");
		builder.append(" WHERE p.store.id = :storeId ");
		if (hasProduct) {
			builder.append(" AND p.productName LIKE :productName ");
		}
		if (hasBrand) {
			builder.append(" AND p.brand.brandName LIKE :brandName ");
		}
		if (hasCategory) {
			builder.append(" AND p.category.categoryName LIKE :categoryName ");
		}
		if (hasPrice) {
			builder.append(" AND p.price = :price ");
		}
		if (hasSortField) {
			builder.append(" ORDER BY ").append("p." + sortField).append(Constants.BLANK + sortOrder);
		} else {
			builder.append(" ORDER BY p.id ").append(sortOrder);
		}

		final TypedQuery<Product> query = getEm().createQuery(builder.toString(), Product.class);
		query.setParameter("storeId", storeId);
		if (hasProduct) {
			query.setParameter("productName", "%" + productName + "%");
		}
		if (hasBrand) {
			query.setParameter("brandName", "%" + brandName + "%");
		}
		if (hasCategory) {
			query.setParameter("categoryName", "%" + categoryName + "%");
		}
		if (hasPrice) {
			query.setParameter("price", price);
		}
		final List<Product> rs = query.getResultList();
		if (page != null && pageSize != null) {
			query.setFirstResult(page * pageSize);
			query.setMaxResults(pageSize);
		}
		final List<Product> rs2 = query.getResultList();
		return new PageImpl<Product>(rs2, PageRequest.of(page, pageSize), rs.size());
	}

	@Override
	public Page<Product> filterProduct(final ProductFilterRequest req, final Integer page, final Integer pageSize) {
		final StringBuilder builder = new StringBuilder();
		builder.append(" SELECT p ");
		builder.append(" FROM Product p ");
		builder.append(" LEFT JOIN FETCH p.category cate ");
		builder.append(" LEFT JOIN FETCH p.brand b ");
		builder.append(" LEFT JOIN FETCH p.productDetails d ");
		builder.append(" LEFT JOIN FETCH d.color c ");
		builder.append(" LEFT JOIN FETCH d.size s ");
		builder.append(" WHERE 1 = 1");
		final String categoryNames = req.getCategoryNames();
		final boolean hasCategoryName = StringUtils.isNotEmpty(categoryNames);
		if (hasCategoryName) {
			builder.append(" AND cate.categoryName = :categoryName ");
		}
		final String productName = req.getProductName();
		final boolean hasProductName = StringUtils.isNotEmpty(productName);
		if (hasProductName) {
			builder.append(" AND p.productName LIKE :productName ");
		}
		final List<String> brandNames = req.getBrandNames();
		final boolean hasBrandNames = CollectionUtils.isNotEmpty(brandNames);
		if (hasBrandNames) {
			builder.append(" AND b.brandName IN (:brandNames) ");
		}
		final List<String> colorNames = req.getColorNames();
		final boolean hasColorNames = CollectionUtils.isNotEmpty(colorNames);
		if (hasColorNames) {
			builder.append(" AND c.colorName IN (:colorNames) ");
		}
		final List<String> sizeNames = req.getSizeNames();
		final boolean hasSizeNames = CollectionUtils.isNotEmpty(sizeNames);
		if (hasSizeNames) {
			builder.append(" AND s.sizeName IN (:sizeNames) ");
		}
		final List<BigDecimal> prices = req.getPrices();
		final boolean hasPrices = CollectionUtils.isNotEmpty(prices);
		if (hasPrices) {
			builder.append(" AND p.price IN (:prices)");
		}
		builder.append(buildSortOrder(req.getSortType()));
		final TypedQuery<Product> query = getEm().createQuery(builder.toString(), Product.class);
		if (hasCategoryName) {
			query.setParameter("categoryName", categoryNames);
		}
		if (hasProductName) {
			query.setParameter("productName", productName);
		}
		if (hasBrandNames) {
			query.setParameter("brandNames", brandNames);
		}
		if (hasColorNames) {
			query.setParameter("colorNames", colorNames);
		}
		if (hasSizeNames) {
			query.setParameter("sizeNames", sizeNames);
		}
		if (hasPrices) {
			query.setParameter("prices", prices);
		}
		final List<Product> rs = query.getResultList();
		if (page != null && pageSize != null) {
			query.setFirstResult(page * pageSize);
			query.setMaxResults(pageSize);
		}
		final List<Product> rs2 = query.getResultList();
		return new PageImpl<Product>(rs2, PageRequest.of(page, pageSize), rs.size());
	}

	private String buildSortOrder(final CustomerSortType sortType) {
		if (sortType == null) {
			return " ORDER BY p.id ";
		}
		switch (sortType) {
		case BESTSELLING:
			return " ORDER BY p.id ";
		case LOW_HIGH:
			return " ORDER BY p.price ASC ";
		case HIGH_LOW:
			return " ORDER BY p.price DESC ";
		case A_Z:
			return " ORDER BY p.productName ASC ";
		case Z_A:
			return " ORDER BY p.productName DESC";
		case OLD_NEW:
			return " ORDER BY p.createdAt ASC ";
		case NEW_OLD:
			return " ORDER BY p.createdAt DESC ";
		default:
			return " ORDER BY p.id ";
		}
	}

}
