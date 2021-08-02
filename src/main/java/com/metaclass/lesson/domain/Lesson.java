package com.metaclass.lesson.domain;

import com.metaclass.authentication.role.Authority;
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
    private long Id;

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
        return "roomId: " + Id + " roomName: " + roomName + " userName: " + teacher + " lessonName: " + lessonName;
    }
}
