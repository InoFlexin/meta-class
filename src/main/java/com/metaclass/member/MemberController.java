package com.metaclass.member;

import com.metaclass.member.domain.Member;
import com.metaclass.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MemberController {

    @Autowired
    MemberService memberService;

    @GetMapping(path = "/member/{email}")   // email로 사용자 정보 찾아오기
    public ResponseEntity<?> findByEmail(@PathVariable String email) {
        return new ResponseEntity<>(memberService.getUser(email), HttpStatus.OK);
    }

}
