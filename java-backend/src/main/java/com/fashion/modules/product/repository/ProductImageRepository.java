package com.fashion.modules.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.product.domain.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {

}
