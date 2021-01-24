package com.fashion.modules.brand.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.brand.domain.Brand;

public interface BrandRepository extends JpaRepository<Brand, Integer> {

}
