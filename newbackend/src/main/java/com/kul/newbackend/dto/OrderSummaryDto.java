package com.kul.newbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderSummaryDto {
    private Long orderId;
    private String clientName;
    private LocalDate orderDate;
    private int totalAmount;
    private Double totalPrice;
    private String status;
}