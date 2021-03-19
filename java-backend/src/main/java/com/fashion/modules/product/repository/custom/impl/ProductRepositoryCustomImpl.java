package com.fashion.modules.product.repository.custom.impl;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.SortEnum;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.product.model.ProductReq;
import com.fashion.modules.product.repository.custom.ProductRepositoryCustom;
import com.fashion.modules.promotion.domain.Promotion;
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
		final String sortOrder = SortEnum.descend.equals(req.getSortOrder()) ? Constants.DESC : Constants.ASC;
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

}
