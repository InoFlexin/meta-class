package com.metaclass.authentication.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider tokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = tokenProvider.resolveToken((HttpServletRequest) request); // 헤더에서 토큰정보를 가져옵니다.

        // 토큰 유효성 검사
        if(token != null && tokenProvider.validationToken(token)) {
            // 토큰에서 유저 정보를 가져옵니다.
            Authentication authentication = tokenProvider.getAuthentication(token);
            // SecurityContextHolder에 Authentication 정보 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        chain.doFilter(request, response);
    }

}
