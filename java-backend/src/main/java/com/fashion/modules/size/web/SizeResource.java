package com.fashion.modules.size.web;

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
import com.fashion.modules.size.model.SizeVM;
import com.fashion.modules.size.service.SizeService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for calendar")
public class SizeResource extends BaseResource {

	private static final String URL = "/size";

	@Autowired
	private SizeService sizeService;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> createSize(@RequestBody final SizeVM req) {

		return success(sizeService.createSize(req));

	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> findById(@PathVariable("id") final Integer id) {
		return success(sizeService.findById(id));
	}

	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getAllSizeByStore(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String sizeName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(sizeService.findAllByStore(page, pageSize, sizeName, sortOrder, sortField));
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteSize(@PathVariable final Integer id,
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String sizeName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {

		return success(sizeService.deleteSize(id, page, pageSize, sizeName, sortOrder, sortField));
	}

	@GetMapping(URL + "/search")
	public ResponseEntity<Map<String, Object>> searchSizeByKeyWord(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String sizeName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(sizeService.searchByKeyword(sizeName, page, pageSize, sortOrder, sortField));
	}

}
