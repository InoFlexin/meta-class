package com.metaclass.lesson.repository;

import com.metaclass.lesson.domain.Lesson;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

public interface LessonRepository extends CrudRepository<Lesson, Long> {

    Optional<Lesson> findByClassName(String className);

    ArrayList<Lesson> findByTeacherAndClassName(String teacher, String className);

    @Transactional
    void deleteByTeacherAndClassName(String teacher, String className);

    ArrayList<Lesson> findAll();

    boolean existsByClassName(String className);
}
