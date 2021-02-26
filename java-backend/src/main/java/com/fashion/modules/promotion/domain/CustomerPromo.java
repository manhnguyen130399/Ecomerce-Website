package com.fashion.modules.promotion.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "customer_promo")
@Access(AccessType.FIELD)
public class CustomerPromo implements Serializable {

	private static final long serialVersionUID = 629705961266622525L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "used_at")
	private Date usedAt;

	@Column(name = "customer_phone")
	private String customerPhone;

	@Column(name = "created_at")
	@CreatedDate
	private Date createdAt;

	@Column(name = "updated_at")
	@LastModifiedDate
	private Date updatedAt;

	@ManyToOne
	@JoinColumn(name = "promotion_id")
	private Promotion promotion;

	public Integer getId() {
		return id;
	}

	public void setId(final Integer id) {
		this.id = id;
	}

	public Date getUsedAt() {
		return usedAt;
	}

	public void setUsedAt(final Date usedAt) {
		this.usedAt = usedAt;
	}

	public String getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(final String customerPhone) {
		this.customerPhone = customerPhone;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(final Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(final Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Promotion getPromotion() {
		return promotion;
	}

	public void setPromotion(final Promotion promotion) {
		this.promotion = promotion;
	}

}
