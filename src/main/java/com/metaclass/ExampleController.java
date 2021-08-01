package com.metaclass;

import com.metaclass.member.model.MemberModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExampleController {

    @GetMapping(path = "/")
    public String index() {
        System.out.println("run");
        return "index.html";
    }

    @GetMapping(path = "/member/{email}")
    public MemberModel getMember(String email) {
        //MemberModel memberModel = memberService.getUser(id);
        return null;
    }
}
