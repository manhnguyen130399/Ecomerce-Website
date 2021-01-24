package com.fashion.modules.size.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for calendar")
public class SizeResource {

	private static final String URL = "/size";

}
