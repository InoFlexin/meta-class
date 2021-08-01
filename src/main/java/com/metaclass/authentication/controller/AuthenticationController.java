package com.metaclass.authentication.controller;

import com.metaclass.authentication.model.JwtTokenProtocolModel;
import com.metaclass.authentication.service.AuthenticationService;
import com.metaclass.member.model.MemberLoginRequestModel;
import com.metaclass.member.model.MemberRequestModel;
import com.metaclass.member.model.MemberResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<MemberResponseModel> register(MemberRequestModel memberRequestModel) {
        return ResponseEntity.ok(authenticationService.signup(memberRequestModel));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtTokenProtocolModel> login(MemberLoginRequestModel memberLoginRequestModel) {
        return ResponseEntity.ok(authenticationService.login(memberLoginRequestModel));
    }

    @PostMapping("/reissue")
    public ResponseEntity<JwtTokenProtocolModel> reissue(JwtTokenProtocolModel tokenProtocolModel) {
        return ResponseEntity.ok(authenticationService.reissue(tokenProtocolModel));
    }

}
