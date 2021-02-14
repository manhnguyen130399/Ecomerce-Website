package com.fashion.service;

import java.io.IOException;
import java.util.List;

import com.google.api.services.drive.model.File;

public interface IGoogleDriveService {
	
	List<File> getAllFile() throws IOException;

	String createNewFolder(String name) throws IOException;

	void deleteFile(String filedId);

	String uploadFile(java.io.File file) throws IOException;
	

}
