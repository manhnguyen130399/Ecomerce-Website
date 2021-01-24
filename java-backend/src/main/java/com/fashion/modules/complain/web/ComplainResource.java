package com.fashion.modules.complain.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Complain")
public class ComplainResource {

	private static final String URL = "/complain";

}
