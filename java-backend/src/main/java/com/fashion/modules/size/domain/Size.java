package com.fashion.modules.size.domain;

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

import org.hibernate.search.annotations.Field;

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.product.domain.ProductDetail;
import com.fashion.modules.store.domain.Store;
import com.google.common.collect.Sets;

@Entity
@Table(name = "size")
@Access(AccessType.FIELD)
public class Size extends AbstractAuditingEntity {

	private static final long serialVersionUID = 8401446074224917065L;

	@Field
	private String sizeName;

	@Column(name = "size_name", unique = true)
	public String getSizeName() {
		return sizeName;
	}

	public void setSizeName(final String sizeName) {
		this.sizeName = sizeName;
	}

	public Size() {
		super();
	}

	public Size(final String sizeName, final Set<Store> stores) {
		super();
		this.sizeName = sizeName;
		this.stores = stores;
	}

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "store_has_size", joinColumns = @JoinColumn(name = "size_id"), inverseJoinColumns = @JoinColumn(name = "store_id"))
	private Set<Store> stores = Sets.newHashSet();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "size", cascade = CascadeType.ALL)
	private Set<ProductDetail> productDetails = Sets.newHashSet();

	public Set<Store> getStores() {
		return stores;
	}

	public void setStores(final Set<Store> stores) {
		this.stores = stores;
	}

	public Set<ProductDetail> getProductDetails() {
		return productDetails;
	}

	public void setProductDetails(final Set<ProductDetail> productDetails) {
		this.productDetails = productDetails;
	}

}
