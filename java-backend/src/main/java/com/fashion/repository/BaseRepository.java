package com.fashion.repository;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BaseRepository {
	
	@Autowired
	private EntityManager em;

	protected EntityManager getEm() {
		return this.em;
	}

}
