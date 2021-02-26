package com.fashion.modules.promotion.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.store.domain.Store;
import com.google.common.collect.Sets;

@Entity
@Table(name = "promotion")
@Access(AccessType.FIELD)
public class Promotion extends AbstractAuditingEntity {

	private static final long serialVersionUID = -7444653312966419895L;

	@Column(name = "title")
	private String title;

	@Column(name = "code")
	private String code;
	
	@Column(name ="qr_code")
	private String qrCode;

	@Column(name = "start_date")
	private Date startDate;

	@Column(name = "end_date")
	private Date endDate;

	@Column(name = "discount")
	private Integer discount;

	@Type(type = "json")
	@Column(name = "promo_condition", columnDefinition = "json")
	private PromotionCondition condition;

	@ManyToOne
	@JoinColumn(name = "store_id")
	private Store store;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "promotion")
	private Set<CustomerPromo> customerPromos = Sets.newHashSet();
	
	public String getQrCode() {
		return qrCode;
	}

	public void setQrCode(final String qrCode) {
		this.qrCode = qrCode;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(final String title) {
		this.title = title;
	}

	public String getCode() {
		return code;
	}

	public void setCode(final String code) {
		this.code = code;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(final Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(final Date endDate) {
		this.endDate = endDate;
	}

	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(final Integer discount) {
		this.discount = discount;
	}
	
	public PromotionCondition getCondition() {
		return condition;
	}

	public void setCondition(final PromotionCondition condition) {
		this.condition = condition;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(final Store store) {
		this.store = store;
	}

	public Set<CustomerPromo> getCustomerPromos() {
		return customerPromos;
	}

	public void setCustomerPromos(final Set<CustomerPromo> customerPromos) {
		this.customerPromos = customerPromos;
	}

}
