package com.fashion.modules.blog.domain;

import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fashion.commons.enums.BlogType;
import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.store.domain.Store;
import com.google.common.collect.Sets;

@Entity
@Table(name = "blog")
@Access(AccessType.FIELD)
public class Blog extends AbstractAuditingEntity {

	private static final long serialVersionUID = -1057915571154447944L;

	@Column(name = "title")
	private String title;

	@Column(name = "content")
	private String content;

	@Column(name = "summary")
	private String summary;

	@ManyToOne
	@JoinColumn(name = "store_id")
	private Store store;

	@Column(name = "state")
	@Enumerated(EnumType.STRING)
	private BlogType state;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "blog")
	private Set<Comment> comments = Sets.newHashSet();

	public String getTitle() {
		return title;
	}

	public void setTitle(final String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(final String content) {
		this.content = content;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(final String summary) {
		this.summary = summary;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(final Store store) {
		this.store = store;
	}

	public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(final Set<Comment> comments) {
		this.comments = comments;
	}

	public BlogType getState() {
		return state;
	}

	public void setState(final BlogType state) {
		this.state = state;
	}

}
