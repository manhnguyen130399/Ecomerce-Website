package com.fashion.commons.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.text.StrBuilder;
import org.springframework.web.multipart.MultipartFile;

public class CommonUtil {
	
	public static File convertMultiPartToFile(final MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();
		return convFile;
	}
	
	public static String replaceContextParam(final String input, final Map<String, String> variables) {
		StrBuilder builder = new StrBuilder(input);
		for (final Entry<String, String> item : variables.entrySet()) {
			builder = builder.replaceAll(item.getKey(), item.getValue());
		}
		return builder.toString();
	}
	
	public static String customToSimpleThymleafVariable(final String it) {
		return "${" + it + "}";
	}

}
