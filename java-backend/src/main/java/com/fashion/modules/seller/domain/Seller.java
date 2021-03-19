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

import com.fashion.commons.enums.GenderType;
import com.fashion.domain.PkIdModel;

@Entity
@Table(name = "seller")
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
	private GenderType gender;

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

	public String getSellerName() {
		return sellerName;
	}

	public void setSellerName(final String sellerName) {
		this.sellerName = sellerName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(final String address) {
		this.address = address;
	}

	public GenderType getGender() {
		return gender;
	}

	public void setGender(final GenderType gender) {
		this.gender = gender;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(final String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(final String email) {
		this.email = email;
	}

	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(final Integer accountId) {
		this.accountId = accountId;
	}

	public Integer getStoreId() {
		return storeId;
	}

	public void setStoreId(final Integer storeId) {
		this.storeId = storeId;
	}

}
