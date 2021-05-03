package com.fashion.modules.wishlist.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fashion.domain.PkIdModel;

@Entity
@Table(name = "wish_list")
public class WishList extends PkIdModel {

	private static final long serialVersionUID = 592744900774586607L;

	@OneToOne(mappedBy = "product_id")
	private Integer productId;

	@Column(name = "account_id")
	private Integer accountId;

	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(final Integer accountId) {
		this.accountId = accountId;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(final Integer productId) {
		this.productId = productId;
	}

}
