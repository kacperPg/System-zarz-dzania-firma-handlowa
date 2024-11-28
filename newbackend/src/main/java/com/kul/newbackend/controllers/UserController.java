package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.UserDto;
import com.kul.newbackend.entities.Role;
import com.kul.newbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.findAll();
        logger.info("Get /api/users: ", users);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserDetails(@PathVariable Long userId) {
        UserDto userDto = userService.findById(userId);
        logger.info("Get /api/users/ " + userId, userDto);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId, @RequestBody UserDto updatedUserDto) {
        UserDto userDto = userService.updateUser(userId, updatedUserDto);
        logger.info("Put /api/users/" + userId + "Request ", updatedUserDto);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        logger.info("Delete /api/users/" + userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
