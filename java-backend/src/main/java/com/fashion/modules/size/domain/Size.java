package com.fashion.modules.size.domain;

import java.util.Set;

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
@Table(name = "size")
public class Size extends AbstractAuditingEntity {

	private static final long serialVersionUID = 8401446074224917065L;

	private String sizeName;

	@Column(name = "size_name")
	public String getSizeName() {
		return sizeName;
	}

	public void setSizeName(final String sizeName) {
		this.sizeName = sizeName;
	}

	public Size() {
		super();
	}

	public Size(final String sizeName) {
		super();
		this.sizeName = sizeName;
	}
	
	@ManyToMany
	@JoinTable(name = "store_has_size", joinColumns = @JoinColumn(name = "size_id"), inverseJoinColumns = @JoinColumn(name = "store_id"))
	private Set<Store> stores = Sets.newHashSet();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "size")
	private Set<ProductDetail> productDetails = Sets.newHashSet();
}
