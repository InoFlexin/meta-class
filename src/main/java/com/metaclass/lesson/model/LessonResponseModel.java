package com.metaclass.lesson.model;

import com.metaclass.lesson.domain.Lesson;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LessonResponseModel {

    private int status;
    private String responseMessage;
    private String roomName;
    private String teacher;
    private String lessonName;

    public static LessonResponseModelBuilder of(Lesson lesson) {
        return LessonResponseModel.builder()
                .roomName(lesson.getRoomName())
                .teacher(lesson.getTeacher())
                .lessonName(lesson.getLessonName());
    }
}