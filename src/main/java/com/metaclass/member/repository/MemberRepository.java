package com.metaclass.member.repository;

import com.metaclass.member.domain.Member;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface MemberRepository extends CrudRepository<Member, Long> {

    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);

}
