package com.metaclass.lesson.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LessonFindModel {

    private String className;
    private String teacher;

    @Override
    public String toString() {
        return "LessonFindModel{" +
                "className='" + className + '\'' +
                ", teacher='" + teacher + '\'' +
                '}';
    }
}
