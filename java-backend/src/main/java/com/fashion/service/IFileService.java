package com.fashion.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface IFileService {

	String upLoad(MultipartFile file) throws IOException;

}
