package com.metaclass.authentication.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JwtTokenProtocolModel {

    private String accessToken;
    private String refreshToken;

    public static JwtTokenProtocolModel of(JwtTokenModel jwtTokenModel) {
        return JwtTokenProtocolModel.builder()
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
