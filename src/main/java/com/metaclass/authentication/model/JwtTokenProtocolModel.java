package com.metaclass.authentication.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JwtTokenProtocolModel {

    private int status;
    private String accessToken;
    private String refreshToken;

    public static JwtTokenProtocolModelBuilder of(JwtTokenModel jwtTokenModel) {
        return JwtTokenProtocolModel.builder()
                .accessToken(jwtTokenModel.getAccessToken())
                .refreshToken(jwtTokenModel.getRefreshToken());
    }

    @Override
    public String toString() {
        return "JwtTokenRequestModel{" +
                "accessToken='" + accessToken + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}
