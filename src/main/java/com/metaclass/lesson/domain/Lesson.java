package com.metaclass.lesson.domain;

import lombok.*;

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

    private String fileName;    // 파일명

    public Lesson(String className, String teacher, String lessonName, String fileName) {
        this.className = className;
        this.teacher = teacher;
        this.lessonName = lessonName;
        this.fileName = fileName;
    }

    @Override
    public String toString() {
        return "classId: " + id + " className: " + className + " userName: " + teacher + " lessonName: " + lessonName + "fileName: " + fileName;
    }
}
