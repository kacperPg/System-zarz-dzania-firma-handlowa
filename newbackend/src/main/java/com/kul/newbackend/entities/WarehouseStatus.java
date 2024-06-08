package com.kul.newbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Table(name = "warehouses_status")
@Entity
public class WarehouseStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_status_id")
    private Long warehouseStatusId;
    @Column(name = "warehouse_id")
    private Long warehouseId;
    @Column(name = "available_quantity")
    private int availableQuantity;
    @Column(name = "soldQuantity")
    private int soldQuantity;
    @Column(name = "product_name")
    private String productName;

}
