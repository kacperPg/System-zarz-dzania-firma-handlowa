package com.kul.newbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class WarehouseStatusDto {
    private Long warehouseStatusId;
    private Long warehouseId;
    private int availableQuantity;
    private int soldQuantity;
    private Long productId;

}
