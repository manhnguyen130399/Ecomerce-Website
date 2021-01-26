package com.fashion.modules.account.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fashion.commons.enums.AccountEnum;
import com.fashion.modules.comment.domain.Comment;
import com.google.common.collect.Sets;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "account")
@Data
public class Account implements Serializable {

	private static final long serialVersionUID = -834374896580318636L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Column(name = "type")
	@Enumerated(EnumType.ORDINAL)
	private AccountEnum type;

	@Column(name = "is_active")
	private Boolean isActive;

	@CreatedDate
	@Column(name = "created_at")
	private Date createdAt;

	@LastModifiedDate
	@Column(name = "updated_at")
	private Date updatedAt;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "account")
	private Set<Comment> comment = Sets.newHashSet();

}
