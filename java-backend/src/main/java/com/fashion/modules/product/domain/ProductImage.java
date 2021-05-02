package com.fashion.modules.product.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.search.annotations.ContainedIn;

import com.fashion.domain.AbstractAuditingEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
@Access(AccessType.FIELD)
public class ProductImage extends AbstractAuditingEntity {

	private static final long serialVersionUID = 6371956687192174016L;

	@Column(name = "image")
	private String image;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "product_id")
	@ContainedIn
	private Product product;

	public String getImage() {
		return image;
	}

	public void setImage(final String image) {
		this.image = image;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(final Product product) {
		this.product = product;
	}

	public ProductImage(final String image) {
		super();
		this.image = image;
	}

	public ProductImage() {
		super();
	}

	public ProductImage(final String image, final Product product) {
		super();
		this.image = image;
		this.product = product;
	}

}
