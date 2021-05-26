package com.fashion.modules.comment.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class UserLikeCommentId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "account_id")
	private Integer accountId;

	@Column(name = "comment_id")
	private Integer commentId;

	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(final Integer accountId) {
		this.accountId = accountId;
	}

	public Integer getCommentId() {
		return commentId;
	}

	public void setCommentId(final Integer commentId) {
		this.commentId = commentId;
	}

	public UserLikeCommentId(final Integer accountId, final Integer commentId) {
		super();
		this.accountId = accountId;
		this.commentId = commentId;
	}

	public UserLikeCommentId() {
		super();
	}

}
