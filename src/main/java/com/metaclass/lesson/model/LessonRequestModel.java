package com.metaclass.lesson.model;

import com.metaclass.lesson.domain.Lesson;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LessonRequestModel {

    private String roomName;
    private String teacher;
    private String lessonName;

    public Lesson toLesson() {
        return Lesson.builder()
                .roomName(roomName)
                .teacher(teacher)
                .lessonName(lessonName)
                .build();
    }

    @Override
    public String toString() {
        return "LessonModel{" +
                "roomName='" + roomName + '\'' +
                ", teacher='" + teacher + '\'' +
                ", lessonName='" + lessonName + '\'' +
                '}';
    }
}
