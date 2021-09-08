package com.metaclass.lesson;

import com.metaclass.configuration.file.FileStorageService;
import com.metaclass.lesson.model.*;
import com.metaclass.lesson.service.LessonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/lesson")
public class LessonController {

    @Autowired
    LessonService lessonService;

    @Autowired
    FileStorageService fileStorageService;

    @GetMapping(path = "/class/find/all")
    public ResponseEntity<LessonFindAllModel> findAllClass() {
        return ResponseEntity.ok(lessonService.findAllRoom());
    }

    @GetMapping(path = "/class")
    public ResponseEntity<LessonFindAllModel> findClass(LessonFindModel lessonFindModel) {
        return ResponseEntity.ok(lessonService.findRoom(lessonFindModel));
    }

    @GetMapping(path = "/class/download/{fileName:.+}")
    public ResponseEntity<Resource> download(@PathVariable String fileName) {
        Resource resource = fileStorageService.load(fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .contentType(MediaType.IMAGE_JPEG)
                .contentType(MediaType.IMAGE_GIF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping(path = "/class", headers = ("content-type=multipart/*"))
    public ResponseEntity<LessonResponseModel> createClass(LessonRequestModel lessonRequestModel,
                                                           @RequestPart("file") MultipartFile file) {
        if(!file.isEmpty()) {
            String fileName = fileStorageService.store(file);

            String fileDownloadURI = "/lesson/class/download/" + fileName;
            lessonRequestModel.setFileName(fileDownloadURI);

            System.out.println("Created new file! " + fileDownloadURI);
        }

        return ResponseEntity.ok(lessonService.createRoom(lessonRequestModel));
    }

    @RequestMapping(value = "/class", method = RequestMethod.DELETE)
    public ResponseEntity<LessonStatusModel> deleteClass(LessonFindModel lessonFindModel) {
        return ResponseEntity.ok(lessonService.deleteRoom(lessonFindModel));
    }

    @RequestMapping("/class/game")
    public ResponseEntity<LessonGameAddressModel> loadGame() {
        return ResponseEntity.ok(LessonGameAddressModel.builder().address("https://45.76.211.222:8080/games/game.html").build());
    }

}