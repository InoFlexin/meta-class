package com.metaclass.member.service;

import com.metaclass.member.domain.Member;
import com.metaclass.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Transactional  // 서비스 함수가 종료될 떄 commit or rollback
    public Member getUser(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(()->new IllegalArgumentException("email을 확인해주세요"));
    }

    public int delUser(long id) { // id 값으로 삭제
        int result; // 1: Delete Success, 0: Delete Failed(null data)
        try {
            memberRepository.deleteById(id);
            result = 1;
        } catch(EmptyResultDataAccessException e) { // 존재하지 않는 id 일 경우 예외발생
            e.printStackTrace();
            result = 0;
        }
        return result;
    }

}
