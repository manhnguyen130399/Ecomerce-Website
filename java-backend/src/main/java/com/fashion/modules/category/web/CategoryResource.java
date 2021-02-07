package com.fashion.modules.category.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fashion.modules.category.model.CategoryVM;
import com.fashion.modules.category.service.CategoryService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Category")
public class CategoryResource extends BaseResource {

	private static final String URL = "/category";

	@Autowired
	private CategoryService categoryService;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> createCategory(@RequestBody final CategoryVM req) {
		return success(categoryService.createCategory(req));
	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> getCategoryById(@PathVariable("id") final Integer id) {
		return success(categoryService.findById(id));
	}

	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getAllCategoryByStore() {
		return success(categoryService.findAllByStore());
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteCategory(@PathVariable("id") final Integer id) {
		categoryService.deleteCategory(id);
		return success(null);
	}
}
