package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.dto.UserDto;
import com.kul.newbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{userEmail}")
    public ResponseEntity<UserDto> getUserDetails(@PathVariable String userEmail) {
        UserDto userDto = userService.findByEmail(userEmail);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

}
