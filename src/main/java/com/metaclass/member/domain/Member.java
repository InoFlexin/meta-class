package com.metaclass.member.domain;

import com.metaclass.authentication.role.Authority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {

    @Id // Primary key : id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ?
    private long id;

    private String email;

    private String username;

    @Column(length = 500)
    private String password;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    public Member(String email, String name, String password) {
        this.email = email;
        this.username = name;
        this.password = password;
    }

    public Member(String email, String name, String password, Authority authority) {
        this.email = email;
        this.username = name;
        this.password = password;
        this.authority = authority;
    }

    @Override
    public String toString() {
        return "id: " + id + " email: " + email + " username: " + username + " password: " + password;
    }
}
