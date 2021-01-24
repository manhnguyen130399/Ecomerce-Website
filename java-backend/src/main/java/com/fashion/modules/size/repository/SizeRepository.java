package com.fashion.modules.size.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.size.domain.Size;

public interface SizeRepository extends JpaRepository<Size, Integer> {

}
