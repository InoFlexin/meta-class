package com.metaclass.authentication.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JwtTokenRequestModel {

    private String accessToken;
    private String refreshToken;

    public static JwtTokenRequestModel of(JwtTokenModel jwtTokenModel) {
        return JwtTokenRequestModel.builder()
                .accessToken(jwtTokenModel.getAccessToken())
                .refreshToken(jwtTokenModel.getRefreshToken())
                .build();
    }

    @Override
    public String toString() {
        return "JwtTokenRequestModel{" +
                "accessToken='" + accessToken + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}
