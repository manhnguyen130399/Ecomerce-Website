package com.fashion.modules.category.web;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.modules.category.model.CategoryVM;
import com.fashion.modules.category.service.CategoryService;
import com.fashion.service.impl.GoogleDriveService;
import com.fashion.web.BaseResource;
import com.google.api.client.util.Maps;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Category")
public class CategoryResource extends BaseResource {
	
	@Autowired
	private GoogleDriveService driveService;

	private static final String URL = "/category";

	@Autowired
	private CategoryService categoryService;
	
	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> createCategory(@RequestParam final String categoryName,
			@RequestParam final MultipartFile file) throws IOException {
		final Map<String, String> res = Maps.newHashMap();
		final File convertMultiPartToFile = CommonUtil.convertMultiPartToFile(file);
		res.put(CommonUtil.customToSimpleThymleafVariable(Constants.FILE_ID),
				driveService.uploadFile(convertMultiPartToFile));
		final CategoryVM req = new CategoryVM(null, categoryName,
				CommonUtil.replaceContextParam(Constants.URL_VIEW_FILE, res));
		convertMultiPartToFile.delete();
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
