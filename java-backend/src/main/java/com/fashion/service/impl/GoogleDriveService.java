package com.fashion.service.impl;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fashion.service.IGoogleDriveService;
import com.google.api.client.http.FileContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;

@Service
public class GoogleDriveService implements IGoogleDriveService {
	


	@Override
	public void getAllFile() throws IOException {
//		FileList result = googleDrive.files().list().setFields("nextPageToken, files(id, name, parents, mimeType)")
//				.execute();
//		return result.getFiles();
	}

	@Override
	public String createNewFolder(final String name) throws IOException {
//		final File fileMetadata = new File();
//        fileMetadata.setName(name);
//        fileMetadata.setMimeType("application/vnd.google-apps.folder");
//        final File file = googleDrive.files().create(fileMetadata).setFields("id").execute();
//        return file.getId();
		return "";
	}

	@Override
	public void deleteFile(String filedId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String uploadFile(final java.io.File input) throws IOException {
//		final String FOLDER_ID_TEST = "1TaQdtZyViboIhjJ84n2Bnfw48fwvefWD";
//		final File fileMetadata = new File();
//		fileMetadata.setName(input.getName());
//		fileMetadata.setParents(Collections.singletonList(FOLDER_ID_TEST));
//		final FileContent mediaContent = new FileContent("image/jpeg", input);
//		final File file = googleDrive.files().create(fileMetadata, mediaContent).setFields("id").execute();
//		return file.getId();
		return "";
	}

}
