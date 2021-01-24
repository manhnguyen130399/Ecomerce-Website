package com.fashion.modules.product.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.category.domain.Category;
import com.fashion.modules.color.domain.Color;
import com.fashion.modules.size.domain.Size;

import lombok.Data;

@Entity
@Table(name = "product_detail")
@Data
public class ProductDetail extends AbstractAuditingEntity {

	private static final long serialVersionUID = 3242184286501781921L;

	@Column(name = "quantity")
	private Integer quantity;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	@ManyToOne
	@JoinColumn(name = "product_category_id")
	private Category category;

	@ManyToOne
	@JoinColumn(name = "size_id")
	private Size size;

	@ManyToOne
	@JoinColumn(name = "color_id")
	private Color color;

}
