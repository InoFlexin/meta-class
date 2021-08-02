package com.metaclass.test;

import com.metaclass.member.MemberController;
import org.springframework.boot.test.context.SpringBootTest;

import com.metaclass.member.repository.MemberRepository;
import com.metaclass.member.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootTest
public class UserTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberService memberService;
    @Autowired
    private MemberController memberController;

    @Test
    public void userReadTest() {
        System.out.println("유저 조회 테스트 =================================");
        System.out.println(memberService.getUser("adasddasd12@naver.com"));
        System.out.println(memberController.findByEmail("adasddasd12@naver.com"));
    }
}
