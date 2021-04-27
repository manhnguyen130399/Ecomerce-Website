package com.fashion.modules.brand.domain;

import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.search.annotations.ContainedIn;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.store.domain.Store;
import com.google.common.collect.Sets;

@Entity
@Table(name = "brand")
@Access(AccessType.FIELD)
@Indexed
public class Brand extends AbstractAuditingEntity {

	private static final long serialVersionUID = -18569127290012608L;

	@Field
	@Column(name = "brand_name")
	private String brandName;

	@ContainedIn
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "brand")
	private Set<Product> products = Sets.newHashSet();

	@ManyToMany
	@JoinTable(name = "store_has_brand", joinColumns = @JoinColumn(name = "brand_id"), inverseJoinColumns = @JoinColumn(name = "store_id"))
	private Set<Store> stores = Sets.newHashSet();

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(final String brandName) {
		this.brandName = brandName;
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

	public Brand(final String brandName, final Set<Store> stores) {
		super();
		this.brandName = brandName;
		this.stores = stores;
	}

	public Brand() {
		super();
	}

}
