package com.fashion.modules.blog.domain;

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

import com.fashion.domain.AbstractAuditingEntity;
import com.fashion.modules.comment.domain.Comment;
import com.fashion.modules.store.domain.Store;
import com.google.common.collect.Sets;

import lombok.Data;

@Entity
@Table(name = "blog")
@Data
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
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "blog")
	private Set<Comment> comments = Sets.newHashSet();

}
