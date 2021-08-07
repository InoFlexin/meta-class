package com.metaclass.lesson.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LessonStatusModel {
    private int status;

    public static LessonStatusModel getStatus(int status) {
        return new LessonStatusModel(status);
    }
}
