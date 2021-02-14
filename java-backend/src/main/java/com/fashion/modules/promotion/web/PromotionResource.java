package com.fashion.modules.promotion.web;

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

import com.fashion.commons.constants.Constants;
import com.fashion.modules.promotion.model.PromotionRequest;
import com.fashion.modules.promotion.service.PromotionService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Promotion")
public class PromotionResource extends BaseResource {

	private static final String URL = "/promotion";

	@Autowired
	private PromotionService promoService;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> creatPromotion(@RequestBody final PromotionRequest req) {
		return success(promoService.createPromotion(req));
	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> getPromotion(@PathVariable final Integer id) {
		return success(promoService.findPromotionById(id));
	}

	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getPromotions() {
		return success(promoService.getAllPromotionByStore());
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deletePromotion(@PathVariable final Integer id) {
		promoService.deletePromotion(id);
		return success(Constants.SUCCESS);
	}

}
