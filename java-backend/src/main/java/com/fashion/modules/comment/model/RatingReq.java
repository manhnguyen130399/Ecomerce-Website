package com.fashion.modules.comment.model;

import javax.annotation.Nonnull;

import lombok.Data;

@Data
public class RatingReq {
	@Nonnull
	private Integer productId;
	@Nonnull
	private Integer rate;
}
