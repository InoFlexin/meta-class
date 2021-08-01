package com.metaclass.test;

import org.springframework.boot.test.context.SpringBootTest;
import com.metaclass.member.domain.Member;
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
        MemberModel model = new MemberModel(1, "adasddasd12@naver.com", "KCH", "1234", 1);
        memberService.memberSave(model);

        Member searchMember = memberRepository.findByEmail("adasddasd12@naver.com");
        System.out.println("search member is " + searchMember);
//        String username = "skaeodud0507";
//        String password = "1234124";
//
//        Member userInfo = new Member(username, password);
//        memberRepository.save(userInfo);
//
//        Member searchMember = memberRepository.findByUsername(username);
//        System.out.println("search member is " + searchMember);
//
//        assertEquals(searchMember != null, true);
//        assertEquals(searchMember.getUsername(), "skaeodud0507");
    }

}
