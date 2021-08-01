package com.metaclass.member.model;

import com.metaclass.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
@AllArgsConstructor
public class RegistrationModel {

    private String email;
    private String username;
    private String password;

    public Member toMember(PasswordEncoder encoder) {
        return Member.builder()
                .email(email)
                .password(encoder.encode(password))
                .name(username)
                .build();
    }

    @Override
    public String toString() {
        return "email: " + email + " password:" + password;
    }
}