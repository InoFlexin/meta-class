package com.metaclass.member.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
//DTO
public class MemberModel {

    private long id;
    private String email;
    private String name;
    private String password;
    private int role;

    @Override
    public String toString() {
        return "id: " + id + " email: " + email + " username: " + name + " password: " + password + " role : " + role;
    }
}