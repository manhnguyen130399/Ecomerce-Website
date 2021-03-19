package com.fashion.modules.promotion.web;

import java.text.ParseException;
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
import com.fashion.modules.promotion.model.PromotionFilterReq;
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
	public ResponseEntity<Map<String, Object>> creatPromotion(@RequestBody final PromotionRequest req)
			throws Exception {
		return success(promoService.createPromotion(req));
	}

	@GetMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> getPromotion(@PathVariable final Integer id) {
		return success(promoService.findPromotionById(id));
	}

	@PostMapping(URL)
	public ResponseEntity<Map<String, Object>> getPromotions(
			@RequestParam(required = true, defaultValue = "0") final Integer page,
			@RequestParam(required = true, defaultValue = "50") final Integer pageSize,
			@RequestBody final PromotionFilterReq req) {
		return success(promoService.getAllPromotionByStore(page, pageSize, req));
	}

	@GetMapping(URL + "/valid-date")
	public ResponseEntity<Map<String, Object>> getValidPromotionDate() throws ParseException {
		return success(promoService.getPromotionValidDate());
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> deletePromotion(@PathVariable final Integer id,
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(promoService.deletePromotion(id, page, pageSize, sortOrder, sortField));
	}

	@PostMapping(URL + "/code")
	public ResponseEntity<Map<String, Object>> getDiscountByCode(@RequestParam final String code) {
		return success(promoService.getDiscountPromtion(code));
	}

	@GetMapping(URL + "/search")
	public ResponseEntity<Map<String, Object>> searchPromotionByKeywordAndStore(
			@RequestParam(required = true, defaultValue = "0") final Integer page,
			@RequestParam(required = true, defaultValue = "50") final Integer pageSize,
			@RequestParam final String keyword) {
		return success(promoService.searchPromotionByKeywordAndStore(keyword, page, pageSize));
	}

	@PostMapping(URL + "/filter")
	public ResponseEntity<Map<String, Object>> filterPromotion(
			@RequestParam(required = true, defaultValue = "0") final Integer page,
			@RequestParam(required = true, defaultValue = "50") final Integer pageSize,
			@RequestBody final PromotionFilterReq req) {
		return success(promoService.filterPromotion(req, page, pageSize));

	}

}
