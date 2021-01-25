package com.fashion.modules.comment.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Comment")
public class CommentResource {

	private static final String URL = "/comment";

}
