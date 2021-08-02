package com.metaclass.member;

import com.metaclass.member.domain.Member;
import com.metaclass.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MemberController {

    @Autowired
    MemberService memberService;

    @GetMapping(path = "/member/{email}")   // email로 사용자 정보 찾아오기
    public ResponseEntity<?> findByEmail(@PathVariable String email) {
        return new ResponseEntity<>(memberService.getUser(email), email != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(path = "/member/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
            return new ResponseEntity<>(memberService.delUser(id), memberService.delUser(id) == 1 ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

}
