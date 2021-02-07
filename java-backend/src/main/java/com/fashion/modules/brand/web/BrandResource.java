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
	public ResponseEntity<Map<String, Object>> getAllBrandByStore() {
		return success(brandService.findAllByStore());
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteBrand(@PathVariable final Integer id) {
		brandService.deleteBrand(id);
		return success(null);
	}

}
