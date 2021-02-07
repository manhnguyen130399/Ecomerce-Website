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
	public ResponseEntity<Map<String, Object>> getAllColorByStore() {
		return success(colorService.findByAllStore());
	}
	
	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deleteColorId(@PathVariable("id") final Integer id) {
		colorService.deleteColor(id);
		return success(null);
	}

}
