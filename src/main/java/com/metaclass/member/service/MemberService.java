package com.metaclass.member.service;

import com.metaclass.member.domain.Member;
import com.metaclass.member.model.MemberModel;
import com.metaclass.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    public void memberSave(MemberModel model) {
        Member member = new Member(model.getId(), model.getEmail(), model.getName(), model.getPassword(), model.getRole());
        memberRepository.save(member);
    }

//    public MemberModel getUser(String username) {
//        Member member = memberRepository.findByUsername(username);
//
//        if(member == null) {
//            throw new RuntimeException(username + " is null!");
//        }
//
//        return new MemberModel(member.getUsername(), member.getPassword());
//    }

}
