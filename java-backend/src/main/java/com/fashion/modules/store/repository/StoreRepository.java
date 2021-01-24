package com.fashion.modules.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fashion.modules.store.domain.Store;

public interface StoreRepository extends JpaRepository<Store, Integer>{

}
