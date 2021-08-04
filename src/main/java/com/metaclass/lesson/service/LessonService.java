package com.metaclass.lesson.service;

import com.metaclass.lesson.domain.Lesson;
import com.metaclass.lesson.model.LessonRequestModel;
import com.metaclass.lesson.model.LessonResponseModel;
import com.metaclass.lesson.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    @Transactional
    public Lesson findRoom(String roomName) {
        return lessonRepository.findByRoomName(roomName)
                .orElseThrow(()->new IllegalArgumentException("존재하지 않는 교실입니다."));
    }

    @Transactional
    public LessonResponseModel createRoom(LessonRequestModel lessonRequestModel) {
        Lesson lesson = lessonRequestModel.toLesson();
        return LessonResponseModel.of(lessonRepository.save(lesson))
                .status(200)
                .responseMessage("교실이 생성되었습니다.")
                .build();
    }

    public HttpStatus delRoom(long id) {
        try {
            lessonRepository.deleteById(id);
            return HttpStatus.OK;
        } catch(EmptyResultDataAccessException e) { // 존재하지 않는 방일 경우 예외발생
            e.printStackTrace();
            return HttpStatus.BAD_REQUEST;
        }
    }
}
