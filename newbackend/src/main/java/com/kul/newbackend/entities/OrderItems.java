package com.kul.newbackend.entities;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Table(name = "order_items")
@Entity
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long orderItemId;
    @Column(name = "order_id")
    private Long orderId;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "price")
    private Double price;
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "warehouse_name")
    private String warehouseName;

    @Column(name = "warehouse_status_id")
    private Long warehouseStatusId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id",insertable = false,updatable = false)
    private Order order;
}
