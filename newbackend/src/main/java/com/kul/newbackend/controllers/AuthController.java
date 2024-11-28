package com.kul.newbackend.controllers;

import com.kul.newbackend.config.UserAuthProvider;
import com.kul.newbackend.dto.CredentialsDto;
import com.kul.newbackend.dto.SignUpDto;
import com.kul.newbackend.dto.UserDto;
import com.kul.newbackend.services.RoleService;
import com.kul.newbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController

public class AuthController {

    private final UserService userService;
    private final UserAuthProvider userAuthProvider;
    private final RoleService roleService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto) {
        logger.info("User login attempt: {}", credentialsDto);
        UserDto user = userService.login(credentialsDto);
        user.setRole(roleService.getRoleById(user.getRoleId()));
        user.setToken(userAuthProvider.createToken(user));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody SignUpDto signUpDto) {
        logger.info("User registration attempt: {}", signUpDto);

        UserDto user = userService.register(signUpDto);
        user.setToken(userAuthProvider.createToken(user));

        return ResponseEntity.created(URI.create("/users/" + user.getId()))
                .body(user);
    }
}
