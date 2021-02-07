package com.fashion.modules.category.domain;

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
@Table(name="category")
@Data
@Access(AccessType.FIELD)
public class Category extends AbstractAuditingEntity{

	private static final long serialVersionUID = -2657588185896188134L;

	@Column(name = "category_name")
	private String categoryName;

	@Column(name = "image")
	private String image;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
	private Set<Product> products = Sets.newHashSet();
	
	@ManyToMany
	@JoinTable(name = "store_has_category", joinColumns = @JoinColumn(name = "category_id"), inverseJoinColumns = @JoinColumn(name = "store_id"))
	private Set<Store> stores = Sets.newHashSet();

}
