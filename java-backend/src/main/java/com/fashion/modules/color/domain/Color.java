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

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "color")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Access(AccessType.FIELD)
public class Color extends AbstractAuditingEntity {

	private static final long serialVersionUID = 4254079776649399838L;

	@Column(name = "color_name")
	private String colorName;

	@ManyToMany(cascade = CascadeType.ALL,  fetch = FetchType.LAZY)
	@JoinTable(name = "store_has_color", joinColumns = @JoinColumn(name = "color_id"), inverseJoinColumns = @JoinColumn(name = "store_id"))
	private Set<Store> stores = Sets.newHashSet();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "color")
	private Set<ProductDetail> productDetails = Sets.newHashSet();

}
