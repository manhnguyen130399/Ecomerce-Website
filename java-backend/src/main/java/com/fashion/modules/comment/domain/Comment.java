package com.fashion.modules.comment.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fashion.modules.account.domain.Account;
import com.fashion.modules.blog.domain.Blog;
import com.fashion.modules.product.domain.Product;

import lombok.Data;

@Entity
@Table(name = "comment")
@Data
public class Comment implements Serializable {

	private static final long serialVersionUID = 8891567408598708082L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "content")
	private String content;

	@Column(name = "email")
	private String email;

	@Column(name = "like")
	private Integer like;

	@CreatedDate
	@Column(name = "created_at")
	private Date createdAt;

	@LastModifiedDate
	@Column(name = "updated_at")
	private Date updatedAt;

	@ManyToOne
	@JoinColumn(name = "account_id")
	private Account account;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	@ManyToOne
	@JoinColumn(name = "blog_id")
	private Blog blog;

}
