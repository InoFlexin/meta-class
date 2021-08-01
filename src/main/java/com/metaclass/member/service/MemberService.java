package com.metaclass.member.service;

import com.metaclass.member.domain.Member;
import com.metaclass.member.model.MemberModel;
import com.metaclass.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public void memberSave(MemberModel model) {
        Member member = new Member(model.getEmail(), model.getName(), model.getPassword());
        memberRepository.save(member);
    }

}
