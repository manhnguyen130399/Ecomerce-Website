package com.fashion.modules.blog.repository.custom.impl;

import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.fashion.commons.enums.BlogType;
import com.fashion.modules.blog.domain.Blog;
import com.fashion.modules.blog.repository.custom.BlogRepositoryCustom;
import com.fashion.repository.BaseRepository;

public class BlogRepositoryCustomImpl extends BaseRepository implements BlogRepositoryCustom {

	@Override
	public Page<Blog> getBlogComple(final Integer page, final Integer pageSize, final BlogType type) {
		final StringBuilder builder = new StringBuilder();
		builder.append(" SELECT b ");
		builder.append(" FROM Blog b ");
		builder.append(" WHERE b.state = 'COMPLETE' ");
		boolean isType = type != null;
		if (isType) {
			builder.append(" AND b.category = :type ");
		}
		builder.append(" ORDER BY b.id DESC ");
		final TypedQuery<Blog> query = getEm().createQuery(builder.toString(), Blog.class);
		if (isType) {
			query.setParameter("type", type);
		}
		final List<Blog> rs = query.getResultList();
		if (page != null && pageSize != null) {
			query.setFirstResult(page * pageSize);
			query.setMaxResults(pageSize);
		}
		final List<Blog> rs2 = query.getResultList();
		return new PageImpl<Blog>(rs2, PageRequest.of(page, pageSize), rs.size());
	}

}
