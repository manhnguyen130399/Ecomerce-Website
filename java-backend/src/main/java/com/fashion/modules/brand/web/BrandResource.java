package com.fashion.modules.brand.web;

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
import com.fashion.commons.enums.SortEnum;
import com.fashion.modules.brand.model.BrandVM;
import com.fashion.modules.brand.service.BrandService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Brand")
public class BrandResource extends BaseResource {

	private static final String URL = "/brand";

	@Autowired
	private BrandService brandService;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> createBrand(@RequestBody final BrandVM req) {
		return success(brandService.createBrand(req));
	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> findBrandById(@PathVariable final Integer id) {
		return success(brandService.findById(id));
	}

	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getAllBrandByStore(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String brandName,
			@RequestParam(required = false, defaultValue = "ascend") final SortEnum sortOrder,
			@RequestParam(required = false, defaultValue = "id") final String sortField) {
		return success(brandService.findAllByStore(page, pageSize, brandName, sortOrder, sortField));
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteBrand(@PathVariable final Integer id,
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String brandName,
			@RequestParam(required = false, defaultValue = "ascend") final SortEnum sortOrder,
			@RequestParam(required = false, defaultValue = "id") final String sortField) {
		return success(brandService.deleteBrand(id, page, pageSize, brandName, sortOrder, sortField));
	}

	@GetMapping(URL + "/search")
	public ResponseEntity<Map<String, Object>> searchBrandByStoreAndKeyword(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String brandName,
			@RequestParam(required = false, defaultValue = "ascend") final SortEnum sortOrder,
			@RequestParam(required = false, defaultValue = "id") final String sortField) {
		return success(brandService.seachBrandByStoreAndKeyword(brandName, sortOrder, page, pageSize, sortField));
	}

}
