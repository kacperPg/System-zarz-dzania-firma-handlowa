package com.kul.newbackend.controllers;

import com.kul.newbackend.config.UserAuthProvider;
import com.kul.newbackend.dto.CredentialsDto;
import com.kul.newbackend.dto.SignUpDto;
import com.kul.newbackend.dto.UserDto;
import com.kul.newbackend.services.UserService;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto){
        UserDto user = userService.login(credentialsDto);
        user.setToken(userAuthProvider.createToken(user));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody SignUpDto signUpDto){
        UserDto user = userService.register(signUpDto);
        user.setToken(userAuthProvider.createToken(user));

        return ResponseEntity.created(URI.create("/users/" + user.getId()))
                .body(user);
    }


}
