package com.fashion.modules.promotion.repository.custom.impl;

import java.util.Date;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.SortType;
import com.fashion.modules.promotion.domain.Promotion;
import com.fashion.modules.promotion.model.PromotionFilterReq;
import com.fashion.modules.promotion.repository.custom.PromotionRepositoryCustom;
import com.fashion.repository.BaseRepository;

@Repository
public class PromotionRepositoryCustomImpl extends BaseRepository implements PromotionRepositoryCustom {

	@Override
	public Page<Promotion> filterPromotion(final PromotionFilterReq req, final Integer page, final Integer pageSize,
			final Integer storeId) {

		final StringBuilder builder = new StringBuilder();
		final String code = req.getCode();
		final boolean hasCode = code != null;
		final String title = req.getTitle();
		final boolean hasTitle = title != null;
		final Integer discount = req.getDiscount();
		final boolean hasDiscount = discount != null;
		final Date startDate = req.getStartDate();
		final boolean hasStartDate = startDate != null;
		final Date endDate = req.getEndDate();
		final boolean hasEndDate = endDate != null;
		final String sortField = req.getSortField();
		final boolean hasSortField = sortField != null;
		final String sortOrder = SortType.ascend.equals(req.getSortOrder()) ? Constants.ASC : Constants.DESC;
		builder.append(" SELECT p ");
		builder.append(" FROM Promotion p ");
		builder.append(" WHERE p.store.id = :storeId ");
		if (hasCode) {
			builder.append(" AND p.code LIKE :code ");
		}
		if (hasTitle) {
			builder.append(" AND p.title LIKE :title ");
		}
		if (hasDiscount) {
			builder.append(" AND p.discount = :discount ");
		}
		if (hasStartDate) {
			builder.append(" AND p.startDate = :startDate ");
		}
		if (hasEndDate) {
			builder.append(" AND p.endDate = :endDate ");
		}
		if (hasSortField) {
			builder.append(" ORDER BY ").append("p." + sortField).append(Constants.BLANK + sortOrder);
		} else {
			builder.append(" ORDER BY p.id ").append(sortOrder);
		}

		final TypedQuery<Promotion> query = getEm().createQuery(builder.toString(), Promotion.class);
		query.setParameter("storeId", storeId);
		if (hasCode) {
			query.setParameter("code", '%' + code + '%');
		}
		if (hasDiscount) {
			query.setParameter("discount", discount);
		}
		if (hasEndDate) {
			query.setParameter("endDate", endDate);
		}
		if (hasStartDate) {
			query.setParameter("startDate", startDate);
		}

		final List<Promotion> rs = query.getResultList();
		if (page != null && pageSize != null) {
			query.setFirstResult(page * pageSize);
			query.setMaxResults(pageSize);
		}
		final List<Promotion> rs2 = query.getResultList();
		return new PageImpl<Promotion>(rs2, PageRequest.of(page, pageSize), rs.size());
	}

}
