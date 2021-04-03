package com.fashion.modules.color.domain;

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
import com.fashion.modules.product.domain.ProductDetail;
import com.fashion.modules.store.domain.Store;
import com.google.common.collect.Sets;

@Entity
@Table(name = "color")
@Access(AccessType.FIELD)
public class Color extends AbstractAuditingEntity {

	private static final long serialVersionUID = 4254079776649399838L;

	@Column(name = "color_name")
	private String colorName;

	@Column(name = "color_hex")
	private String colorHex;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "store_has_color", joinColumns = @JoinColumn(name = "color_id"), inverseJoinColumns = @JoinColumn(name = "store_id"))
	private Set<Store> stores = Sets.newHashSet();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "color")
	private Set<ProductDetail> productDetails = Sets.newHashSet();

	public String getColorName() {
		return colorName;
	}

	public void setColorName(final String colorName) {
		this.colorName = colorName;
	}

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

	public Color(final String colorName, final Set<Store> stores, final Set<ProductDetail> productDetails) {
		super();
		this.colorName = colorName;
		this.stores = stores;
		this.productDetails = productDetails;
	}

	public Color() {
		super();
	}

	public Color(final String colorName, final Set<Store> stores, final String colorHex) {
		super();
		this.colorName = colorName;
		this.stores = stores;
		this.colorHex = colorHex;
	}

	public String getColorHex() {
		return colorHex;
	}

	public void setColorHex(final String colorHex) {
		this.colorHex = colorHex;
	}
}
