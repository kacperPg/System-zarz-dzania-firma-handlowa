package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.OrderDto;
import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.entities.Order;
import com.kul.newbackend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDto> addOrder(@RequestBody OrderDto orderDto) {
        OrderDto addedOrderDto = orderService.addOrder(orderDto);
        return new ResponseEntity<>(addedOrderDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long orderId) {
        OrderDto order = orderService.getOrderById(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable Long orderId, @RequestBody OrderDto updatedOrderDto) {
        OrderDto order = orderService.updateOrder(orderId, updatedOrderDto);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
