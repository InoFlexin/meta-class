package com.metaclass.authentication.jwt;

import com.metaclass.authentication.model.JwtTokenModel;
import com.metaclass.member.repository.MemberRepository;
import io.jsonwebtoken.*;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Component
@NoArgsConstructor
public class JwtTokenProvider {

    private static String jwtTokenSecret = "meta-class-like-professional";
    private static String bearer = "bearer";
    private static final long ACCESS_VALIDATION_TIME = 60 * 60 * 1000L; // 1시간
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostConstruct
    protected void init() {
        jwtTokenSecret = Base64.getEncoder().encodeToString(jwtTokenSecret.getBytes());
    }

    public JwtTokenModel generateTokenModel(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        long now = new Date().getTime();

        Date accessTokenExpiresIn = new Date(now + ACCESS_VALIDATION_TIME);
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("auth", authorities)
                .setExpiration(accessTokenExpiresIn)
                .signWith(SignatureAlgorithm.HS256, jwtTokenSecret)
                .compact();

        Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
        String refreshToken = Jwts.builder()
                .setExpiration(refreshTokenExpiresIn)
                .signWith(SignatureAlgorithm.HS256, jwtTokenSecret)
                .compact();

        return JwtTokenModel.builder()
                .grantType(bearer)
                .accessToken(accessToken)
                .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
                .refreshToken(refreshToken)
                .build();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token);

        if(claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        UserDetails user = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(user, "", authorities);
    }

    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser()
                    .setSigningKey(jwtTokenSecret)
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    public boolean validationToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtTokenSecret).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

}
