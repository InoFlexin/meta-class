package com.metaclass.configuration.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Calendar;

@Service
public class FileStorageService {

        private final Path fileStorageLocation;

        @Autowired
        public FileStorageService(FileStorageProperties fileStorageProperties) {
                this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDirectory())
                        .toAbsolutePath()
                        .normalize();
                createDirectories();
        }

        private void createDirectories() {
                try {
                        Files.createDirectories(fileStorageLocation);
                } catch (Exception e) {
                        e.printStackTrace();
                }
        }

        private String to(int calendarType) {
                return String.valueOf(Calendar.getInstance().get(calendarType));
        }

        public String store(MultipartFile file) {
                StringBuilder stringBuilder = new StringBuilder();
                String fileName = stringBuilder
                        .append(to(Calendar.YEAR))
                        .append(to(Calendar.MONTH))
                        .append(to(Calendar.DATE))
                        .append(to(Calendar.HOUR))
                        .append(to(Calendar.MINUTE))
                        .append(to(Calendar.SECOND))
                        .append(to(Calendar.MILLISECOND))
                        .append("_").append(file.getOriginalFilename())
                        .toString();

                try {
                        Path targetLocation = fileStorageLocation.resolve(fileName);
                        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

                        return fileName;
                } catch (IOException e) {
                        e.printStackTrace();
                }

                return "";
        }

        public Resource load(String fileName) {
                try {
                        Path filePath = fileStorageLocation.resolve(fileName).normalize();
                        Resource resource = new UrlResource(filePath.toUri());

                        if(resource.exists()) {
                                return resource;
                        }
                } catch (MalformedURLException e) {
                        e.printStackTrace();
                }

                return null;
        }
}
