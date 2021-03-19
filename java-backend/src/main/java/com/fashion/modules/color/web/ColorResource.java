package com.fashion.modules.color.web;

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
import com.fashion.modules.color.model.ColorVM;
import com.fashion.modules.color.service.ColorService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Color")
public class ColorResource extends BaseResource {
	private static final String URL = "/color";

	@Autowired
	private ColorService colorService;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> createColor(@RequestBody final ColorVM req) {
		return success(colorService.createColor(req));
	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> getColorById(@PathVariable("id") final Integer id) {
		return success(colorService.findById(id));
	}

	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getAllColorByStore(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String colorName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(colorService.findByAllStore(colorName, sortOrder, sortField, page, pageSize));
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteColorId(@PathVariable("id") final Integer id,
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String colorName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(colorService.deleteColor(id, colorName, sortOrder, sortField, page, pageSize));
	}

	@GetMapping(URL + "/search")
	public ResponseEntity<Map<String, Object>> searchColorByKeywordAndStore(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String colorName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(colorService.searchColorByKeywordAndStore(colorName, sortOrder, sortField, page, pageSize));
	}
}
