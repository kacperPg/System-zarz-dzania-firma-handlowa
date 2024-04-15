package kul.projekt.backend.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import kul.projekt.backend.entity.User;
import kul.projekt.backend.service.UserService;
import kul.projekt.backend.user.WebUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Controller
@RequestMapping("/register")
public class RegistrationController {

    private Logger logger = Logger.getLogger(getClass().getName());

    private UserService userService;

    @Autowired
    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @InitBinder
    public void initBinder(WebDataBinder dataBinder) {

        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);

        dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
    }

    @GetMapping("/showRegistrationForm")
    public String showMyLoginPage(Model theModel) {

        theModel.addAttribute("webUser", new WebUser());

        return "register/registration-form";
    }

    @PostMapping("/processRegistrationForm")
    public ResponseEntity<Map<String, String>> processRegistrationForm(
            @Valid @ModelAttribute("webUser") WebUser theWebUser,
            BindingResult theBindingResult,
            HttpSession session, Model theModel) {

        String userName = theWebUser.getUserName();
        logger.info("Processing registration form for: " + userName);

        // form validation
//        if (theBindingResult.hasErrors()) {
//            return "register/registration-form";
//        }

        // check the database if user already exists
        User existing = userService.findByUserName(userName);
        Map<String, String> response = new HashMap<>();
        if (existing != null) {
            response.put("success", "false");
            response.put("message", "User name already exists.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // create user account and store in the databse
        userService.save(theWebUser);

        logger.info("Successfully created user: " + userName);

        // place user in the web http session for later use
        session.setAttribute("user", theWebUser);

        response.put("success", "true");
        response.put("message", "Registration successful!");
        return ResponseEntity.ok(response);
    }
}