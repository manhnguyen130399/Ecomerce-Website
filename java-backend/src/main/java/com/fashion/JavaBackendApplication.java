package com.fashion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JavaBackendApplication {

	public static void main(String[] args) {
		final StringBuilder builder = new StringBuilder();
		builder.append("********** FASHION BACKEND JAVA************\n");
		builder.append("**********Author: Manh Nguyen *************\n");
		System.out.println(builder);
		
		SpringApplication.run(JavaBackendApplication.class, args);
	}

}
