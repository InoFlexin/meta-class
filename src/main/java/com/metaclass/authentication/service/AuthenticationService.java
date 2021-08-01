package com.metaclass.authentication.service;

import com.metaclass.authentication.jwt.JwtTokenProvider;
import com.metaclass.authentication.domain.RefreshToken;
import com.metaclass.authentication.model.JwtTokenModel;
import com.metaclass.authentication.model.JwtTokenProtocolModel;
import com.metaclass.authentication.repository.RefreshTokenRepository;
import com.metaclass.member.domain.Member;
import com.metaclass.member.model.MemberLoginRequestModel;
import com.metaclass.member.model.MemberResponseModel;
import com.metaclass.member.model.MemberRequestModel;
import com.metaclass.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public MemberResponseModel signup(MemberRequestModel memberRequestModel) {
        if(memberRepository.existsByEmail(memberRequestModel.getEmail())) {
            return MemberResponseModel.builder()
                    .email(memberRequestModel.getEmail())
                    .username(memberRequestModel.getUsername())
                    .status(403)
                    .responseMessage("이미 가입되어있는 회원입니다.")
                    .build();
        }

        Member member = memberRequestModel.toMember(passwordEncoder);
        return MemberResponseModel.of(memberRepository.save(member))
                .status(200)
                .responseMessage("회원가입에 성공하였습니다.")
                .build();
    }

    @Transactional
    public JwtTokenProtocolModel login(MemberLoginRequestModel memberLoginRequestModel) {
        // id/pw based token 생성
        UsernamePasswordAuthenticationToken authenticationToken = memberLoginRequestModel.toAuthentication();
        // 검증
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 인증정보 기반으로 jwt 토큰 생성
        JwtTokenModel tokenModel = tokenProvider.generateTokenModel(authentication);
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenModel.getRefreshToken())
                .build();
        refreshTokenRepository.save(refreshToken);

        return JwtTokenProtocolModel.of(tokenModel).status(200).build();
    }

    @Transactional
    public JwtTokenProtocolModel reissue(JwtTokenProtocolModel tokenRequestModel) {
        if(!tokenProvider.validationToken(tokenRequestModel.getRefreshToken())) {
            throw new RuntimeException("Refresh token이 유요하지 않습니다.");
        }

        Authentication authentication = tokenProvider.getAuthentication(tokenRequestModel.getAccessToken());
        RefreshToken refreshToken = refreshTokenRepository.findByTableKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃된 사용자입니다."));

        if(!refreshToken.getValue().equalsIgnoreCase(tokenRequestModel.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        JwtTokenModel tokenModel = tokenProvider.generateTokenModel(authentication);
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenModel.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        return JwtTokenProtocolModel.of(tokenModel).status(200).build();
    }

}
