package com.metaclass;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExampleController {

    @GetMapping(path = "/")
    public String index() {
        System.out.println("run");
        return "index.html";
    }
}
