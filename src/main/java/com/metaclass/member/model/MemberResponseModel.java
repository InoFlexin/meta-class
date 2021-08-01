package com.metaclass.member.model;

import com.metaclass.member.domain.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberResponseModel {

    private String email;
    private String username;

    public static MemberResponseModel of(Member member) {
        return MemberResponseModel.builder()
                .email(member.getEmail())
                .username(member.getUsername())
                .build();
    }

}
