package com.fashion.modules.product.domain;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.color.domain.Color;
import com.fashion.modules.size.domain.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "product_detail")
@Access(AccessType.FIELD)
public class ProductDetail extends AbstractAuditingEntity {

	private static final long serialVersionUID = 3242184286501781921L;

	@Column(name = "quantity")
	private Integer quantity;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	@ManyToOne
	@JoinColumn(name = "size_id")
	private Size size;

	@ManyToOne
	@JoinColumn(name = "color_id")
	private Color color;

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(final Integer quantity) {
		this.quantity = quantity;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(final Product product) {
		this.product = product;
	}

	public Size getSize() {
		return size;
	}

	public void setSize(final Size size) {
		this.size = size;
	}

	public Color getColor() {
		return color;
	}

	public void setColor(final Color color) {
		this.color = color;
	}

	public ProductDetail(final Integer quantity, final Product product, final Size size, final Color color) {
		super();
		this.quantity = quantity;
		this.product = product;
		this.size = size;
		this.color = color;
	}

	public ProductDetail() {
		super();
	}
	
	
	

}
