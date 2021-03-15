package com.fashion.config;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configurable
@EnableJpaRepositories(basePackages = { "com.fashion.repository.*",
		"com.fashion.modules.*.repository" }, repositoryImplementationPostfix = "CustomImpl")
@EnableJpaAuditing
@EnableTransactionManagement
@EntityScan("com.fashion.modules.*.domain")
public class DatabaseConfiguration {

}
