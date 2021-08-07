package com.metaclass.lesson;

import com.metaclass.lesson.model.LessonFindModel;
import com.metaclass.lesson.model.LessonRequestModel;
import com.metaclass.lesson.model.LessonResponseModel;
import com.metaclass.lesson.model.LessonStatusModel;
import com.metaclass.lesson.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/lesson")
public class LessonController {

    @Autowired
    LessonService lessonService;

    @GetMapping(path = "/class")
    public ResponseEntity<LessonResponseModel> findClass(LessonFindModel lessonFindModel) {
        return ResponseEntity.ok(lessonService.findRoom(lessonFindModel));
    }

    @PostMapping(path = "/class")
    public ResponseEntity<LessonResponseModel> createClass(LessonRequestModel lessonRequestModel) {
        return ResponseEntity.ok(lessonService.createRoom(lessonRequestModel));
    }

    @RequestMapping(value="/class", method = RequestMethod.DELETE)
    public ResponseEntity<LessonStatusModel> echoDelete(@RequestBody LessonFindModel lessonFindModel) {
        return ResponseEntity.ok(lessonService.deleteRoom(lessonFindModel));
    }

}