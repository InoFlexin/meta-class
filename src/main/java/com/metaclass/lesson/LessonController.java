package com.metaclass.lesson;

import com.metaclass.lesson.model.LessonRequestModel;
import com.metaclass.lesson.model.LessonResponseModel;
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

    @PostMapping(path = "/makeRoom")
    public ResponseEntity<LessonResponseModel> make(LessonRequestModel lessonRequestModel) {
        return ResponseEntity.ok(lessonService.createRoom(lessonRequestModel)); // ?
    }

    @GetMapping(path = "/findRoom")
    public ResponseEntity<?> findByRoomName(String roomName) {
        return new ResponseEntity<>(lessonService.findRoom(roomName), roomName!= null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(path = "/delRoom")
        public ResponseEntity<?> deleteById(Long id) {
            return new ResponseEntity<>(lessonService.delRoom(id));
        }

}
