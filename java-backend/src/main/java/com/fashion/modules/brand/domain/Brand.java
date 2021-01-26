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

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.product.domain.Product;
import com.fashion.modules.store.domain.Store;
import com.google.common.collect.Sets;

import lombok.Data;

@Entity
@Table(name = "brand")
@Data
@Access(AccessType.FIELD)
public class Brand extends AbstractAuditingEntity {

	private static final long serialVersionUID = -18569127290012608L;

	@Column(name = "brand_name")
	private String brandName;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "brand")
	private Set<Product> products = Sets.newHashSet();
	
	@ManyToMany
	@JoinTable(name = "store_has_brand", joinColumns = @JoinColumn(name = "brand_id"), inverseJoinColumns = @JoinColumn(name = "store_id"))
	private Set<Store> stores = Sets.newHashSet();

}
