package com.fashion.commons.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.bind.DatatypeConverter;

import org.apache.commons.lang3.text.StrBuilder;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import com.fashion.commons.constants.Constants;
import com.fashion.commons.enums.SortEnum;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

public class CommonUtil {
	
	private static final int QR_CODE_SIZE = 300;
	
	public static File convertMultiPartToFile(final MultipartFile file) throws IOException {
		final File convFile = new File(file.getOriginalFilename());
		final FileOutputStream fos = new FileOutputStream(convFile);
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
	
	public static String generateQrCode(final String qrCode, Integer size) {
		final QRCodeWriter qrCodeWriter = new QRCodeWriter();
		BitMatrix bitMatrix;
		try {
			size = size != null ? size : QR_CODE_SIZE;
			bitMatrix = qrCodeWriter.encode(qrCode, BarcodeFormat.QR_CODE, size, size);
			final ByteArrayOutputStream stream = new ByteArrayOutputStream();
			MatrixToImageWriter.writeToStream(bitMatrix, "jpg", stream);
			return Base64.getEncoder().encodeToString(stream.toByteArray());
		} catch (WriterException | IOException e) {
			return null;
		}
	}
	
	public static File QrCodeToFile(final String qrCode, final String name) throws Exception {
		byte[] data = DatatypeConverter.parseBase64Binary(qrCode);
		final File file = new File(Constants.CODE_PROMOTION + name);
		final FileOutputStream fos = new FileOutputStream(file);
		fos.write(data);
		fos.close();
		return file;
	}
	
	public static Sort sortCondition(final SortEnum sortOrder, final String sortField) {
		return SortEnum.ascend.equals(sortOrder) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
	}

}
