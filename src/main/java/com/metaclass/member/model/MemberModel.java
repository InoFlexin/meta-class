package com.metaclass.member.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//DTO
public class MemberModel {

    private long id;
    private String email;
    private String name;
    private String password;

    public MemberModel(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    @Override
    public String toString() {
        return "id: " + id + " email: " + email + " username: " + name + " password: " + password;
    }
}