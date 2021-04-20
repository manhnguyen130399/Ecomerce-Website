package com.fashion.modules.store.domain;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fashion.modules.blog.domain.Blog;
import com.fashion.modules.brand.domain.Brand;
import com.fashion.modules.category.domain.Category;
import com.fashion.modules.color.domain.Color;
import com.fashion.modules.promotion.domain.Promotion;
import com.fashion.modules.size.domain.Size;
import com.google.common.collect.Sets;

@Entity
@Table(name = "store")
public class Store implements Serializable {

	private static final long serialVersionUID = 559304058982328096L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String storeName;

	private String address;

	private Time openTime;

	private Time closeTime;

	private String owner;

	private String website;
	
	private String logo;

	@CreatedDate
	@CreationTimestamp
	private Date createdAt;

	@LastModifiedDate
	@UpdateTimestamp
	private Date updatedAt;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "store")
	private Set<Promotion> promotions = Sets.newHashSet();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "store")
	private Set<Blog> blogs = Sets.newHashSet();

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "store_has_size", joinColumns = @JoinColumn(name = "store_id"), inverseJoinColumns = @JoinColumn(name = "size_id"))
	private Set<Size> sizes = Sets.newHashSet();

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "store_has_color", joinColumns = @JoinColumn(name = "store_id"), inverseJoinColumns = @JoinColumn(name = "color_id"))
	private Set<Color> colors = Sets.newHashSet();

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "store_has_category", joinColumns = @JoinColumn(name = "store_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<Category> categories = Sets.newHashSet();

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "store_has_brand", joinColumns = @JoinColumn(name = "store_id"), inverseJoinColumns = @JoinColumn(name = "brand_id"))
	private Set<Brand> brands = Sets.newHashSet();

	@Column(name = "store_name")
	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(final String storeName) {
		this.storeName = storeName;
	}

	@Column(name = "address")
	public String getAddress() {
		return address;
	}

	public void setAddress(final String address) {
		this.address = address;
	}

	@Column(name = "owner")
	public String getOwner() {
		return owner;
	}

	public void setOwner(final String owner) {
		this.owner = owner;
	}

	@Column(name = "website")
	public String getWebsite() {
		return website;
	}

	public void setWebsite(final String website) {
		this.website = website;
	}

	@Column(name = "open_time")
	public Time getOpenTime() {
		return openTime;
	}

	public void setOpenTime(final Time openTime) {
		this.openTime = openTime;
	}

	@Column(name = "close_time")
	public Time getCloseTime() {
		return closeTime;
	}

	public void setCloseTime(final Time closeTime) {
		this.closeTime = closeTime;
	}

	@Column(name = "created_at")
	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(final Date createdAt) {
		this.createdAt = createdAt;
	}

	@Column(name = "updated_at")
	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(final Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	@Column(name = "logo")
	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public Integer getId() {
		return id;
	}

	public void setId(final Integer id) {
		this.id = id;
	}

	public Set<Promotion> getPromotions() {
		return promotions;
	}

	public void setPromotions(final Set<Promotion> promotions) {
		this.promotions = promotions;
	}

	public Set<Blog> getBlogs() {
		return blogs;
	}

	public void setBlogs(final Set<Blog> blogs) {
		this.blogs = blogs;
	}

	public Set<Size> getSizes() {
		return sizes;
	}

	public void setSizes(final Set<Size> sizes) {
		this.sizes = sizes;
	}

	public Set<Color> getColors() {
		return colors;
	}

	public void setColors(final Set<Color> colors) {
		this.colors = colors;
	}

	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(final Set<Category> categories) {
		this.categories = categories;
	}

	public Set<Brand> getBrands() {
		return brands;
	}

	public void setBrands(final Set<Brand> brands) {
		this.brands = brands;
	}

}
