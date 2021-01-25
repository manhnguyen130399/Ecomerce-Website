package com.fashion.config;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configurable
@EnableJpaRepositories(basePackages = { "com.fashion.repository",
		"com.fashion.modules.*.repository" }, repositoryImplementationPostfix = "CustomImpl")
@EnableJpaAuditing
@EnableTransactionManagement
public class DatabaseConfiguration {

}
