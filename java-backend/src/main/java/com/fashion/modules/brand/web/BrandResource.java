package com.fashion.modules.brand.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Brand")
public class BrandResource {

	private static final String URL = "/brand";

}
