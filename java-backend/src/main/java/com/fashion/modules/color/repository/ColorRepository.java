package com.fashion.modules.color.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.color.domain.Color;

public interface ColorRepository extends JpaRepository<Color, Integer> {

}
