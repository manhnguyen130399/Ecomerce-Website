package com.fashion.modules.promotion.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Promotion")
public class PromotionResource {

	private static final String URL = "/promotion";

}
