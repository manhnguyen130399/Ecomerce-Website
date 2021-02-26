package com.fashion.service.impl;

import java.io.File;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.utils.CommonUtil;
import com.fashion.service.ICommonService;
import com.fashion.service.IGoogleDriveService;
import com.google.api.client.util.Maps;

@Service
public class CommonService implements ICommonService {

	@Autowired
	private IGoogleDriveService drive;
	
	@Override
	public String generateLinkQrCode(final String input) throws Exception {
		final File file = CommonUtil.QrCodeToFile(CommonUtil.generateQrCode(input, null), Constants.ORDER);
		final Map<String, String> res = Maps.newHashMap();
		res.put(CommonUtil.customToSimpleThymleafVariable(Constants.FILE_ID), drive.uploadFile(file));
		file.delete();
		return CommonUtil.replaceContextParam(Constants.URL_VIEW_FILE, res);
	}

}
