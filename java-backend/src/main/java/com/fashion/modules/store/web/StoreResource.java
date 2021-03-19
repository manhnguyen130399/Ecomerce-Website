package com.fashion.modules.store.web;

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
import com.fashion.commons.enums.SortType;
import com.fashion.modules.store.model.StoreReq;
import com.fashion.modules.store.service.StoreService;
import com.fashion.web.BaseResource;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API for Store")
public class StoreResource extends BaseResource {

	private static final String URL = "/store";

	@Autowired
	private StoreService storeService;

	@PostMapping(value = { URL + "/v2" })
	public ResponseEntity<Map<String, Object>> createStoreV2(@RequestBody final StoreReq req) {
		return success(storeService.createStore(req));
	}

	@GetMapping(value = { URL + "/{id}" })
	public ResponseEntity<Map<String, Object>> getStore(@PathVariable(name = "id") final Integer id) {
		return success(storeService.getStore(id));
	}

	@GetMapping(value = { URL })
	public ResponseEntity<Map<String, Object>> getStores(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String storeName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(storeService.getStores(storeName, sortOrder, sortField, page, pageSize));
	}

	@PutMapping(value = { URL + "/{id}" })
	public ResponseEntity<Map<String, Object>> updateStore(@RequestBody final StoreReq req,
			@PathVariable(name = "id") final Integer id) {
		return success(storeService.updateStore(req, id));
	}

	@DeleteMapping(value = { URL + "/{id}" })
	public ResponseEntity<Map<String, Object>> deleteStore(@PathVariable(name = "id") final Integer id,
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String storeName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(storeService.deleteStore(id, storeName, sortOrder, sortField, page, pageSize));
	}

	@PostMapping(URL + "/list")
	public ResponseEntity<Map<String, Object>> getStoreByIds(@RequestBody final List<Integer> ids) {
		return success(storeService.getStoreByIds(ids));
	}

	@GetMapping(URL + "/search")
	public ResponseEntity<Map<String, Object>> searchStore(
			@RequestParam(required = false, defaultValue = "0") final Integer page,
			@RequestParam(required = false, defaultValue = "50") final Integer pageSize,
			@RequestParam(required = false, defaultValue = Constants.NONE) final String storeName,
			@RequestParam(required = false, defaultValue = "ascend") final SortType sortOrder,
			@RequestParam(required = false, defaultValue = Constants.FIELD_ID) final String sortField) {
		return success(storeService.searchStore(storeName, sortOrder, sortField, page, pageSize));
	}

	@GetMapping(URL + "/existed")
	public ResponseEntity<Map<String, Object>> checkStoreNameExisted(@RequestParam final String storeName) {
		return success(storeService.existedStoreName(storeName));
	}

}
