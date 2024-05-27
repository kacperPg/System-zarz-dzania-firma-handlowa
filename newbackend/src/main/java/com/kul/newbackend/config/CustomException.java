package com.kul.newbackend.config;


public class CustomException extends RuntimeException {
    public CustomException(String message) {
        super(message);
    }
}