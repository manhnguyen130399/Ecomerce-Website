package com.fashion.modules.product.domain;

import java.math.BigDecimal;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.brand.domain.Brand;
import com.fashion.modules.category.domain.Category;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.store.domain.Store;
import com.google.common.collect.Sets;

import lombok.Data;

@Entity
@Table(name = "product")
@Data
public class Product extends AbstractAuditingEntity {

	private static final long serialVersionUID = 8690924342016681887L;

	@Column(name = "product_name")
	private String productName;

	@Column(name = "price")
	private BigDecimal price;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	@ManyToOne
	@JoinColumn(name = "brand_id")
	private Brand brand;

	@ManyToOne
	@JoinColumn(name = "store_id")
	private Store store;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private Set<Comment> comments = Sets.newHashSet();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private Set<ProductDetail> productDetails = Sets.newHashSet();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private Set<ProductImage> productImages = Sets.newHashSet();

}
