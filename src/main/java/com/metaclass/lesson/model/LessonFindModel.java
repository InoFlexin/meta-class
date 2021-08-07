package com.metaclass.lesson.model;

import lombok.Getter;

@Getter
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
