package com.metaclass.lesson.repository;

import com.metaclass.lesson.domain.Lesson;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface LessonRepository extends CrudRepository<Lesson, Long> {

    Optional<Lesson> findByRoomName(String roomName);
}
