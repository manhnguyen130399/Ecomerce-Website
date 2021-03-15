package com.fashion.modules.product.web;

import java.util.List;
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
import com.fashion.modules.product.model.ProductReq;
import com.fashion.modules.product.service.ProductService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Product")
public class ProductResource extends BaseResource {

	private static final String URL = "/product";
	
	@Autowired
	private ProductService productService;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> createProduct(@RequestBody final ProductReq req) {
		return success(productService.createProduct(req));
	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> getProductById(@PathVariable final Integer id) {
		return success(productService.findById(id));
	}
	
	@PostMapping(URL)
	public ResponseEntity<Map<String, Object>> getAllProductByStore(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestBody final ProductReq req) {
		return success(productService.getAllProductByStore(page, pageSize, req));
	}
	
	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteProduct(@PathVariable final Integer id) {
		productService.deleteProduct(id);
		return success(Constants.SUCCESS);
	}
	
	@PutMapping(URL)
	public ResponseEntity<Map<String, Object>> updateProduct(@RequestBody final ProductReq req) {
		return success(productService.updateProduct(req));
	}
	
	@PostMapping(URL + "/detail")
	public ResponseEntity<Map<String, Object>> getProductDetailInfos(@RequestBody final List<Integer> req) {
		return success(productService.getProductDetailInfos(req));
	}
	
	@GetMapping(URL + "/search")
	public ResponseEntity<Map<String, Object>> searchProductByStoreAndKeyword(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam final String keyword) {
		return success(productService.searchProductByKeywordAndStore(keyword, page, pageSize));
	}
	
	@PostMapping(URL + "/filter")
	public ResponseEntity<Map<String, Object>> filterProduct(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestBody final ProductReq req) {
		return success(productService.filterProduct(page, pageSize, req));
	}
}


