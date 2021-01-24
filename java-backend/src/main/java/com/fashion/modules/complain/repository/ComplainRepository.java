package com.fashion.modules.complain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.complain.domain.Complain;

public interface ComplainRepository extends JpaRepository<Complain, Integer> {

}
