package com.fashion.modules.product.web;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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
import org.springframework.web.multipart.MultipartFile;
import com.fashion.commons.constants.Constants;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.modules.product.domain.ProductImage;
import com.fashion.modules.product.model.ProductReq;
import com.fashion.modules.product.service.ProductService;
import com.fashion.service.IGoogleDriveService;
import com.fashion.web.BaseResource;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.util.Maps;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Product")
public class ProductResource extends BaseResource {

	private static final String URL = "/product";
	
	@Autowired
	private ProductService productService;
	
	@Autowired 
	private IGoogleDriveService googleDrive;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> createProduct(@RequestParam final String data,
			@RequestParam final List<MultipartFile> files) throws JsonMappingException, JsonProcessingException {
		final ProductReq res = new ObjectMapper().readValue(data, ProductReq.class);
		res.setProductImages(uploadFiles(files));
		return success(productService.createProduct(res));
	}

	private Set<ProductImage> uploadFiles(final List<MultipartFile> files) {
		return files.parallelStream().map(it -> {
			final Map<String, String> res = Maps.newHashMap();
			File convertMultiPartToFile;
			try {
				convertMultiPartToFile = CommonUtil.convertMultiPartToFile(it);
				res.put(CommonUtil.customToSimpleThymleafVariable(Constants.FILE_ID),
						googleDrive.uploadFile(convertMultiPartToFile));
				convertMultiPartToFile.delete();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return new ProductImage(CommonUtil.replaceContextParam(Constants.URL_VIEW_FILE, res));
		}).collect(Collectors.toSet());
	}
	
	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> getProductById(@PathVariable final Integer id) {
		return success(productService.findById(id));
	}
	
	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getAllProductByStore() {
		return success(productService.getAllProductByStore());
	}
	
	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteProduct(@PathVariable final Integer id) {
		productService.deleteProduct(id);
		return success("Success");
	}
	
	@PutMapping(URL)
	public ResponseEntity<Map<String, Object>> deleteProduct(@RequestBody final ProductReq req) {
		return success(productService.updateProduct(req));
	}
	
	@PostMapping(URL + "/detail")
	public ResponseEntity<Map<String, Object>> getProductDetailInfos(@RequestBody final List<Integer> req) {
		return success(productService.getProductDetailInfos(req));
	}
}


