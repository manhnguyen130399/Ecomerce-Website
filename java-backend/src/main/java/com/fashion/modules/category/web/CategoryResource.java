package com.fashion.modules.category.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Category")
public class CategoryResource {

	private static final String URL = "/category";
}
