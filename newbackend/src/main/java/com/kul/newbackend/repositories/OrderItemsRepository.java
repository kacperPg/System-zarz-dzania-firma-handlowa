package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemsRepository extends JpaRepository<OrderItems,Long> {
    List<OrderItems> findByOrderId(Long orderId);

}
