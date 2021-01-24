package com.fashion.modules.promotion.domain;

import java.util.Date;
import java.util.Set;

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

import lombok.Data;

@Entity
@Table(name = "promotion")
@Data
public class Promotion extends AbstractAuditingEntity {

	private static final long serialVersionUID = -7444653312966419895L;

	@Column(name = "title")
	private String title;

	@Column(name = "code")
	private String code;

	@Column(name = "start_date")
	private Date startDate;

	@Column(name = "end_date")
	private Date endDate;

	@Column(name = "discouny")
	private Integer discount;

	@Type(type = "json")
	@Column(name = "promo_condition", columnDefinition = "json")
	private String condition;

	@ManyToOne
	@JoinColumn(name = "store_id")
	private Store store;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "promotion")
	private Set<CustomerPromo> customerPromos = Sets.newHashSet();

}
