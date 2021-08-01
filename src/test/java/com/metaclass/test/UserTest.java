package com.metaclass.test;

import org.springframework.boot.test.context.SpringBootTest;

import com.metaclass.member.model.MemberModel;
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

    @Test
    public void userDomainCreateTest() {
        MemberModel model = new MemberModel("adasddasd12@naver.com", "KCH", "1234");
        memberService.memberSave(model);
    }
}
