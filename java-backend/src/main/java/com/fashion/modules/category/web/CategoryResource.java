package com.fashion.modules.category.web;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestParam;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.SortType;
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
	public ResponseEntity<Map<String, Object>> createCategory(@RequestBody final CategoryVM req) throws IOException {
		return success(categoryService.createCategory(req));
	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> getCategoryById(@PathVariable("id") final Integer id) {
		return success(categoryService.findById(id));
	}

	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getAllCategoryByStore(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String categoryName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(categoryService.findAllByStore(page, pageSize, categoryName, sortOrder, sortField));
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteCategory(@PathVariable("id") final Integer id,
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String categoryName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(categoryService.deleteCategory(id, page, pageSize, categoryName, sortOrder, sortField));
	}

	@GetMapping(URL + "/search")
	public ResponseEntity<Map<String, Object>> searchCategoryByKeywordAndStore(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String categoryName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(
				categoryService.searchCategoryByKeywordAndStore(categoryName, sortOrder, sortField, page, pageSize));
	}
	
	@GetMapping(URL + "/category-all-store")
	public ResponseEntity<Map<String, Object>> getAllCategory() {
		return success(categoryService.getAll());
	}
}
