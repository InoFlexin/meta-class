package com.metaclass;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonController {

    @GetMapping(path = "/")
    public String index() {
        return "index.html";
    }

}