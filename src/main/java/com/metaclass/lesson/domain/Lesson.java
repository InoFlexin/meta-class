package com.metaclass.lesson.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

// Entity

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Lesson {

    @Id // Primary key : id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String roomName;    // 방제목

    private String teacher;    // 강사이름

    private String lessonName;  // 강좌명

    public Lesson(String roomName, String teacher, String lessonName) {
        this.roomName = roomName;
        this.teacher = teacher;
        this.lessonName = lessonName;
    }

    @Override
    public String toString() {
        return "roomId: " + id + " roomName: " + roomName + " userName: " + teacher + " lessonName: " + lessonName;
    }
}
