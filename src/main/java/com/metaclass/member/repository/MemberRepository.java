package com.metaclass.member.repository;

import com.metaclass.member.domain.Member;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Long> {

    Member findByEmail(String email);
    Member findByRole(String role);

}
