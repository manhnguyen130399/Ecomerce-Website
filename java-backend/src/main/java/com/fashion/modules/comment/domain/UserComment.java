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

	@Column(name = "liked")
	private boolean liked;

	@Column(name = "disliked")
	private boolean disliked;

	public boolean isLiked() {
		return liked;
	}

	public void setLiked(final boolean liked) {
		this.liked = liked;
	}

	public boolean isDisliked() {
		return disliked;
	}

	public void setDisliked(final boolean disliked) {
		this.disliked = disliked;
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
