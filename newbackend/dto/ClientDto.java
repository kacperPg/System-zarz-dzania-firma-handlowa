package com.kul.newbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ClientDto {
    private Long clientId;
    private String clientName;
    private String nipNumber;
    private String phoneNumber;
    private String address;
    private String clientEmail;
}
