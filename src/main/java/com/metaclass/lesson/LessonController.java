package com.metaclass.lesson;

import com.metaclass.lesson.model.*;
import com.metaclass.lesson.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/lesson")
public class LessonController {

    @Autowired
    LessonService lessonService;

    @GetMapping(path = "/class/find/all")
    public ResponseEntity<LessonFindAllModel> findAllClass() {
        return ResponseEntity.ok(lessonService.findAllRoom());
    }

    @GetMapping(path = "/class")
    public ResponseEntity<LessonFindAllModel> findClass(LessonFindModel lessonFindModel) {
        return ResponseEntity.ok(lessonService.findRoom(lessonFindModel));
    }

    @PostMapping(path = "/class")
    public ResponseEntity<LessonResponseModel> createClass(LessonRequestModel lessonRequestModel) {
        return ResponseEntity.ok(lessonService.createRoom(lessonRequestModel));
    }

    @RequestMapping(value = "/class", method = RequestMethod.DELETE)
    public ResponseEntity<LessonStatusModel> deleteClass(LessonFindModel lessonFindModel) {
        return ResponseEntity.ok(lessonService.deleteRoom(lessonFindModel));
    }

}