package com.metaclass.member.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Member {

    @Id // Primary key : id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ?
    private long id;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "USERNAME")
    private String name;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "ROLE")
    private int role;   // admin : 0, user : 1

    public Member(long id, String email, String name, String password, int role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
    }

    @Override
    public String toString() {
        return "id: " + id + "email: " + email + " username: " + name + " password: " + password + " role : " + role;
    }
}
