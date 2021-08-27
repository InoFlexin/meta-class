package com.metaclass.lesson.model;

import com.metaclass.lesson.domain.Lesson;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LessonResponseModel {

    private int status;
    private String responseMessage;
    private String className;
    private String teacher;
    private String lessonName;
    private String fileName;

    public static LessonResponseModelBuilder of(Lesson lesson) {
        return LessonResponseModel.builder()
                .className(lesson.getClassName())
                .teacher(lesson.getTeacher())
                .lessonName(lesson.getLessonName())
                .fileName(lesson.getFileName());
    }
}
