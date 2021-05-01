package com.fashion.service.impl;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashion.service.IIndexingService;
@Service
public class IndexingService implements IIndexingService {
	
	@Autowired
	private EntityManager em;

	// Create indexing for hibernate search
	@Override
	@Transactional
	public void initiateIndexing() throws InterruptedException {
		FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(em);
		fullTextEntityManager.createIndexer().startAndWait();
	}

}
