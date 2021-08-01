package com.metaclass.member.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegistrationModel {

    private String username;
    private String email;
    private String password;
    private int age;

    @Override
    public String toString() {
        return "email: " + email + " password:" + password;
    }
}