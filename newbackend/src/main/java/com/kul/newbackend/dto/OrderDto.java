package com.kul.newbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OrderDto {
    private Long orderId;
    private Long clientId;
    private int totalAmount;
    private LocalDate orderDate;
    private String status;
    private Date paymentDate;
    private Double totalPrice;
    private List<OrderItemsDto> orderItems;
}
