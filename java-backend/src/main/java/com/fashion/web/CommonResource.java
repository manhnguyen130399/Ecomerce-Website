package com.fashion.web;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.service.ICommonService;
import com.fashion.service.IGoogleDriveService;
import com.fashion.service.IIndexingService;
import com.google.api.client.util.Maps;

import io.swagger.annotations.Api;

@Controller
@RequestMapping(path = { "/api" })
@Api(value = "API common")
public class CommonResource extends BaseResource {

	@Autowired
	private ICommonService commonService;

	private static final String URL = "/qr";

	private static final String URL_UPLOAD = "/upload";

	private static final String URL_SYNC = "/sync";

	@Autowired
	private IGoogleDriveService driveService;

	@Autowired
	private IIndexingService indexingService;
	
	@PostMapping(URL)
	public ResponseEntity<Map<String, Object>> generateQrCode(@RequestBody final String qrCode) throws Exception {
		return success(commonService.generateLinkQrCode(qrCode));
	}

	@PostMapping(URL_UPLOAD)
	public ResponseEntity<Map<String, Object>> uploadFiles(@RequestParam final List<MultipartFile> files) {
		final Map<String, String> res = Maps.newHashMap();
		final List<String> output = files.parallelStream().map(it -> {
			try {
				final File convertMultiPartToFile = CommonUtil.convertMultiPartToFile(it);
				res.put(CommonUtil.customToSimpleThymleafVariable(Constants.FILE_ID),
						driveService.uploadFile(convertMultiPartToFile));
				convertMultiPartToFile.delete();
				return CommonUtil.replaceContextParam(Constants.URL_VIEW_FILE, res);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return null;
		}).collect(Collectors.toList());
		return success(output);
	}

	@GetMapping(URL_SYNC)
	public ResponseEntity<Map<String, Object>> indexing() throws InterruptedException {
		indexingService.initiateIndexing();
		return success(Constants.SUCCESS);
	}
}
