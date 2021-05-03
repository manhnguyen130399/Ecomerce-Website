package com.fashion.modules.wishlist.web;

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
import com.fashion.modules.wishlist.service.WishListService;
import com.fashion.web.BaseResource;

@Controller
@RequestMapping(path = { "/api" })
public class WishListResource extends BaseResource {

	private static final String URL = "/wish-list";

	@Autowired
	private WishListService wishListService;

	@PostMapping(URL + "/create")
	public ResponseEntity<Map<String, Object>> create(@RequestBody final Integer productId) {
		return success(wishListService.create(productId));
	}

	@DeleteMapping(URL + "/{id}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable("id") final Integer productId) {
		wishListService.delete(productId);
		return success(Constants.SUCCESS);
	}

	@GetMapping(URL)
	public ResponseEntity<Map<String, Object>> getWishListByAccount(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize) {
		return success(wishListService.getProductWishList(page, pageSize));
	}

}
