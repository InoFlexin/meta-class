package com.metaclass.lesson.service;

import com.metaclass.lesson.domain.Lesson;
import com.metaclass.lesson.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.transaction.annotation.Transactional;

public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    public Lesson getRoom(String roomName) {
        return lessonRepository.findByRoomName(roomName)
                .orElseThrow(()->new IllegalArgumentException("방이름을 확인해주세요."));
    }

    public int delRoom(long roomId) {
        int result;
        try {
            lessonRepository.deleteById(roomId);
            result = 1;
        } catch(EmptyResultDataAccessException e) { // 존재하지 않는 방일 경우 예외발생
            e.printStackTrace();
            result = 0;
        }
        return result;
    }
}
