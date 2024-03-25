package kul.projekt.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
    @GetMapping("/")
    public String showHome(){
        return "home";
    }

    @GetMapping("/testAdminEndpoint")
    public String adminEndpoint(){
        return "test_admin_page";
    }
}
