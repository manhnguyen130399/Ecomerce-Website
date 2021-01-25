package com.fashion.modules.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.product.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
