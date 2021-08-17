package com.metaclass.lesson.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Lesson {

    @Id // Primary key : id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String className;    // 방제목

    private String teacher;    // 강사이름

    private String lessonName;  // 강좌명

    public Lesson(String className, String teacher, String lessonName) {
        this.className = className;
        this.teacher = teacher;
        this.lessonName = lessonName;
    }

    @Override
    public String toString() {
        return "classId: " + id + " className: " + className + " userName: " + teacher + " lessonName: " + lessonName;
    }
}
