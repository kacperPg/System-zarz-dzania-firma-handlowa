package com.kul.newbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OrderItemsDto {
    private Long orderItemId;
    private Long orderId;
    private int quantity;
    private Double price;
    private Long productId;
    private String warehouseName;
    private Long warehouseStatusId;
}
