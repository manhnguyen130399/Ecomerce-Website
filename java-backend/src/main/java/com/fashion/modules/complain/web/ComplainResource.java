package com.fashion.modules.complain.web;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fashion.modules.complain.model.ComplainRequest;
import com.fashion.modules.complain.service.ComplainService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Complain")
public class ComplainResource extends BaseResource {

	private static final String URL = "/complain";
	
	@Autowired
	private ComplainService complainService;
	
	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> complain(@RequestBody final ComplainRequest req) {
		return success(complainService.complain(req));
	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> getComplain(@PathVariable final Integer id) {
		return success(complainService.getComplain(id));
	}

	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getComplains() {
		return success(complainService.getComplainByStore());
	}
	
	@PostMapping(URL + "/reply/{id}")
	public ResponseEntity<Map<String, Object>> reply(@PathVariable final Integer id,
			@RequestParam final String message) {
		return success(complainService.reply(id, message));
	}

}
