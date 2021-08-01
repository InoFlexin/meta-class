package com.metaclass.authentication.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JwtTokenModel {

    private String grantType;
    private String accessToken;
    private long accessTokenExpiresIn;
    private String refreshToken;

    @Override
    public String toString() {
        return "JwtTokenModel{" +
                "grantType='" + grantType + '\'' +
                ", accessToken='" + accessToken + '\'' +
                ", accessTokenExpiresIn=" + accessTokenExpiresIn +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}
