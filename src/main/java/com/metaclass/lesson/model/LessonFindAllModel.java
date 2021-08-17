package com.metaclass.lesson.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class LessonFindAllModel {

    private List<LessonResponseModel> lessons;

    @Override
    public String toString() {
        return "LessonFindAllModel{" +
                "lessons=" + lessons +
                '}';
    }
}
