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

import com.fashion.modules.size.model.SizeVM;
import com.fashion.modules.size.service.SizeService;
import com.fashion.service.impl.GoogleDriveService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for calendar")
public class SizeResource extends BaseResource {

	private static final String URL = "/size";

	@Autowired
	private SizeService sizeService;
	
	@Autowired
	private GoogleDriveService googleDriveService;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> createSize(@RequestBody final SizeVM req) {
		
		return success(sizeService.createSize(req));

	}
	
	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> findById(@PathVariable("id") final Integer id) {
		return success(sizeService.findById(id));
	}
	
	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getAllSizeByStore() {
		return success(sizeService.findAllByStore());
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteSize(@PathVariable final Integer id) {
		sizeService.deleteSize(id);
		return success(null);
	}

}
