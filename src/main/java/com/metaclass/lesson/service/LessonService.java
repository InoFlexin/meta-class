package com.metaclass.lesson.service;

import com.metaclass.lesson.domain.Lesson;
import com.metaclass.lesson.model.LessonFindModel;
import com.metaclass.lesson.model.LessonRequestModel;
import com.metaclass.lesson.model.LessonResponseModel;
import com.metaclass.lesson.model.LessonStatusModel;
import com.metaclass.lesson.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    public LessonResponseModel findRoom(LessonFindModel lessonFindModel) {
        Optional<Lesson> lessonOptional = lessonRepository.findByTeacherAndClassName(lessonFindModel.getTeacher(), lessonFindModel.getClassName());

        if(lessonOptional.isPresent()) {
            Lesson lesson = lessonOptional.get();
            return LessonResponseModel.of(lesson)
                    .status(200)
                    .responseMessage("방을 찾았습니다.")
                    .build();
        }
        return LessonResponseModel.builder()
                .status(404)
                .responseMessage("존재하지 않습니다!")
                .build();
    }

    public LessonResponseModel createRoom(LessonRequestModel lessonRequestModel) {
        Lesson lesson = lessonRequestModel.toLesson();
        return LessonResponseModel.of(lessonRepository.save(lesson))
                .status(200)
                .responseMessage("교실이 생성되었습니다.")
                .build();
    }

    public LessonStatusModel deleteRoom(LessonFindModel lessonFindModel) {
        if(lessonFindModel.getTeacher() == null || lessonFindModel.getClassName() == null)  {
            return LessonStatusModel.getStatus(403);
        }

        try {
            lessonRepository.deleteByTeacherAndClassName(lessonFindModel.getTeacher(), lessonFindModel.getClassName());
            return LessonStatusModel.getStatus(200);
        } catch(EmptyResultDataAccessException e) { // 존재하지 않는 방일 경우 예외발생
            e.printStackTrace();
            return LessonStatusModel.getStatus(403);
        }
    }
}
