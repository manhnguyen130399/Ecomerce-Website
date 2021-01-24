package com.fashion.modules.product.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.brand.domain.Brand;
import com.fashion.modules.category.domain.Category;
import com.fashion.modules.store.domain.Store;

import lombok.Data;

@Entity
@Table
@Data
public class ProductImage extends AbstractAuditingEntity {

	private static final long serialVersionUID = 6371956687192174016L;
	
	@Column(name = "image")
	private String image;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	@ManyToOne
	@JoinColumn(name = "product_category_id")
	private Category category;

	@ManyToOne
	@JoinColumn(name = "product_store_id")
	private Store store;

	@ManyToOne
	@JoinColumn(name = "product_brand_id")
	private Brand brand;

}
