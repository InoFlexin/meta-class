package com.metaclass.member.model;

import com.metaclass.authentication.role.Authority;
import com.metaclass.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
@AllArgsConstructor
public class MemberRequestModel {

    private String email;
    private String username;
    private String password;

    public Member toMember(PasswordEncoder encoder) {
        return Member.builder()
                .email(email)
                .password(encoder.encode(password))
                .username(username)
                .authority(Authority.ROLE_USER)
                .build();
    }

    @Override
    public String toString() {
        return "email: " + email + " password:" + password;
    }
}