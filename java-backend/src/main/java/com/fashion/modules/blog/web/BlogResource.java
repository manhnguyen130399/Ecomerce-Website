package com.fashion.modules.blog.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.SortType;
import com.fashion.modules.blog.model.BlogReq;
import com.fashion.modules.blog.model.BlogUpdateReq;
import com.fashion.modules.blog.service.BlogService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Blog")
public class BlogResource extends BaseResource {

	private static final String URL = "blog";

	@Autowired
	private BlogService blogService;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody final BlogReq req) {
		return success(blogService.createBlog(req));
	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> getBlogById(@PathVariable final Integer id) {
		return success(blogService.getBlogById(id));
	}

	@PutMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> updateBlog(@RequestBody final BlogUpdateReq req,
			@PathVariable final Integer id) {
		return success(blogService.updateBlog(id, req));
	}

	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getAllBlog(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String title) {
		return success(blogService.getAllBlog(page, pageSize, sortOrder, sortField, title));
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteBlog(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String title,
			@PathVariable Integer id) {
		return success(blogService.deleteBlog(id, page, pageSize, sortOrder, sortField, title));
	}

}
