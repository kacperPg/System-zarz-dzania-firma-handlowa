package com.kul.newbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SignUpDto {

    private String name;
    private String lastName;
    private String email;
    private char[] password;
}
