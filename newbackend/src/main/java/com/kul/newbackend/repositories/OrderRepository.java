package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
