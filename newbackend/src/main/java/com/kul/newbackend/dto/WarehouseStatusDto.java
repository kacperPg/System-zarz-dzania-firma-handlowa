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
    private String warehouseName;
    private int availableQuantity;
    private int soldQuantity;
    private String productName;

}
