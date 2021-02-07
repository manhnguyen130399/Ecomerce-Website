package com.fashion.modules.seller.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fashion.commons.enums.GenderEnum;
import com.fashion.domain.PkIdModel;

import lombok.Data;

@Entity
@Table(name = "seller")
@Data
public class Seller extends PkIdModel {

	private static final long serialVersionUID = -4678692355182878116L;
	
	@CreatedDate
	@CreationTimestamp
	private Date createdAt;

	@LastModifiedDate
	@UpdateTimestamp
	private Date updatedAt;

	@Column(name = "seller_name")
	private String sellerName;

	@Column(name = "address")
	private String address;

	@Column(name = "gender")
	@Enumerated(EnumType.ORDINAL)
	private GenderEnum gender;

	@Column(name = "phone")
	private String phone;

	@Column(name = "email")
	private String email;

	@OneToOne
	@JoinColumn(name = "account_id", referencedColumnName = "id")
	private Integer accountId;

	@OneToOne
	@JoinColumn(name = "store_id", referencedColumnName = "id")
	private Integer storeId;
}
