package com.fashion.modules.comment.model;

import java.io.Serializable;
import java.util.Date;

import com.fashion.commons.constants.Constants;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class CommentVM implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1329401033693083547L;

	private Integer id;

	private String content;

	private String email;

	private String customerName;

	private String customerImage;

	@JsonFormat(pattern = Constants.DATE_FORMAT_MMDDYYYY_HYPHEN)
	private Date createdAt;

	private Integer like;

	private Integer dislike;

	private Integer accountId;

	private Integer rating;

}
