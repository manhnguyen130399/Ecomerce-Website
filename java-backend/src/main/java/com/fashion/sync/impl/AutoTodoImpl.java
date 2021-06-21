package com.fashion.sync.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fashion.service.IIndexingService;
import com.fashion.sync.AutoTodo;
@Service
public class AutoTodoImpl implements AutoTodo {
	
	@Autowired
	private IIndexingService indexingService;

	@Override
	@Scheduled(cron = "0 0 0 * * *")
	public void autoReindex() throws InterruptedException {
		indexingService.initiateIndexing();
	}
	
}
