package com.metaclass.member.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Getter
@NoArgsConstructor
public class Member implements UserDetails {

    @Id // Primary key : id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ?
    private long id;

    @Column(name = "EMAIL", length = 50, nullable = false)
    private String email;

    @Column(name = "USERNAME", length = 20, nullable = false)
    private String name;

    @Column(name = "PASSWORD", length = 30, nullable = false)
    private String password;

    public Member(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    @Override
    public String toString() {
        return "id: " + id + "email: " + email + " username: " + name + " password: " + password;
    }
}
