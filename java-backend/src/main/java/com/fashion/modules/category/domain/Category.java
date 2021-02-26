package com.fashion.modules.category.domain;

import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.store.domain.Store;
import com.google.common.collect.Sets;

@Entity
@Table(name = "category")
@Access(AccessType.FIELD)
public class Category extends AbstractAuditingEntity {

	private static final long serialVersionUID = -2657588185896188134L;

	@Column(name = "category_name")
	private String categoryName;

	@Column(name = "image")
	private String image;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "category")
	private Set<Product> products = Sets.newHashSet();

	@ManyToMany
	@JoinTable(name = "store_has_category", joinColumns = @JoinColumn(name = "category_id"), inverseJoinColumns = @JoinColumn(name = "store_id"))
	private Set<Store> stores = Sets.newHashSet();

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(final String categoryName) {
		this.categoryName = categoryName;
	}

	public String getImage() {
		return image;
	}

	public void setImage(final String image) {
		this.image = image;
	}

	public Set<Product> getProducts() {
		return products;
	}

	public void setProducts(final Set<Product> products) {
		this.products = products;
	}

	public Set<Store> getStores() {
		return stores;
	}

	public void setStores(final Set<Store> stores) {
		this.stores = stores;
	}

}
