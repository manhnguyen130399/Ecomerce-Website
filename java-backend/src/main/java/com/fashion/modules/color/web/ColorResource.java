package com.fashion.modules.color.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Color")
public class ColorResource {
	private static final String URL = "/color";

}
