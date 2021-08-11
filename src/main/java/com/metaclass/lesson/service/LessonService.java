package com.metaclass.lesson.service;

import com.metaclass.lesson.domain.Lesson;
import com.metaclass.lesson.model.*;
import com.metaclass.lesson.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    public LessonFindAllModel findAllRoom() {
        return new LessonFindAllModel(
                lessonRepository.findAll()
                        .stream()
                        .map(lesson -> LessonResponseModel.of(lesson).status(200).build())
                        .collect(Collectors.toList())
        );
    }

    public LessonFindAllModel findRoom(LessonFindModel lessonFindModel) {

        if(!lessonFindModel.getTeacher().isEmpty() || !lessonFindModel.getClassName().isEmpty()) {   // 조건문제인듯..
            return new LessonFindAllModel(
                    lessonRepository.findByTeacherAndClassName(lessonFindModel.getTeacher(), lessonFindModel.getClassName())
                            .stream()
                            .map(lesson -> LessonResponseModel.of(lesson).status(200).responseMessage(lessonFindModel.getClassName() + "을 가져왔습니다.").build())
                            .collect(Collectors.toList())
            );
        } else {
            return new LessonFindAllModel(new ArrayList<>());
        }
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
            return LessonStatusModel.getStatus(400);
        } else if(lessonRepository.findByTeacherAndClassName(lessonFindModel.getTeacher(), lessonFindModel.getClassName()).isEmpty()) {
            return LessonStatusModel.getStatus(404);
        }

        lessonRepository.deleteByTeacherAndClassName(lessonFindModel.getTeacher(), lessonFindModel.getClassName());
        return LessonStatusModel.getStatus(200);
    }
}
