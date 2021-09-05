package com.metaclass.lesson.model;

import com.metaclass.lesson.domain.Lesson;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LessonRequestModel {

    private String className;
    private String teacher;
    private String lessonName;
    private String fileName;

    public Lesson toLesson() {
        return Lesson.builder()
                .className(className)
                .teacher(teacher)
                .lessonName(lessonName)
                .fileName(fileName)
                .build();
    }

    @Override
    public String toString() {
        return "LessonRequestModel{" +
                "className='" + className + '\'' +
                ", teacher='" + teacher + '\'' +
                ", lessonName='" + lessonName + '\'' +
                ", fileName='" + fileName + '\'' +
                '}';
    }
}
