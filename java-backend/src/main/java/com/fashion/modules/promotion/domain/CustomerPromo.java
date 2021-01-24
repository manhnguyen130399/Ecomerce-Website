package com.fashion.modules.promotion.domain;

import java.io.Serializable;
import java.util.Date;

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

import lombok.Data;

@Entity
@Table(name="customer_promo")
@Data
public class CustomerPromo implements Serializable {

	private static final long serialVersionUID = 629705961266622525L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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

}
