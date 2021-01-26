package com.fashion.modules.complain.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import com.fashion.commons.enums.ComplainEnum;
import com.fashion.modules.store.domain.Store;

import lombok.Data;

@Entity
@Table(name = "complain")
@Data
@Access(AccessType.FIELD)
public class Complain implements Serializable {

	private static final long serialVersionUID = 4857965269572311121L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "content")
	private String content;

	@Column(name = "email")
	private String email;

	@Column(name = "state")
	@Enumerated(EnumType.STRING)
	private ComplainEnum state;

	@CreatedDate
	@Column(name = "created_at")
	private Date createdAt;

	@ManyToOne
	@JoinColumn(name = "store_id")
	private Store store;

}
