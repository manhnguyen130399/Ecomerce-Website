package com.fashion.modules.comment.domain;

import java.io.Serializable;

import javax.annotation.Nonnull;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_like_comment")
public class UserComment implements Serializable {

	private static final long serialVersionUID = 1L;

	@EmbeddedId
	@Nonnull
	private UserLikeCommentId userLikeCommentId;
	
	@Column(name = "is_like")
	private Boolean isLike;

	public Boolean getIsLike() {
		return isLike;
	}

	public void setIsLike(final Boolean isLike) {
		this.isLike = isLike;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "comment_id", insertable = false, updatable = false)
	private Comment comment;

	public UserLikeCommentId getUserLikeCommentId() {
		return userLikeCommentId;
	}

	public void setUserLikeCommentId(final UserLikeCommentId userLikeCommentId) {
		this.userLikeCommentId = userLikeCommentId;
	}

	public Comment getComment() {
		return comment;
	}

	public void setComment(final Comment comment) {
		this.comment = comment;
	}
	
	

}
