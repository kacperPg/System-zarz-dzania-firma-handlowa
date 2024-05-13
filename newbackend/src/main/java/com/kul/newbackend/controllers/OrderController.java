package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.OrderDto;
import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.entities.DateSet;
import com.kul.newbackend.entities.Order;
import com.kul.newbackend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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

    @PostMapping("/orderBeforeDate")
    public ResponseEntity<List<OrderDto>> getAllOrdersBeforeDate(@RequestBody LocalDate date) {
        List<OrderDto> orders = orderService.getAllOrders().stream()
                .filter(s -> s.getOrderDate().isBefore(date))
                .collect(Collectors.toList());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/orderAfterDate")
    public ResponseEntity<List<OrderDto>> getAllOrdersAfterDate(@RequestBody LocalDate date) {
        List<OrderDto> orders = orderService.getAllOrders().stream()
                .filter(s -> s.getOrderDate().isAfter(date))
                .collect(Collectors.toList());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/orderBeetwenDate")
    public ResponseEntity<List<OrderDto>> getAllOrdersBeetwenDate(@RequestBody DateSet dates) {
        List<OrderDto> orders = orderService.getAllOrders().stream()
                .filter(s -> s.getOrderDate().isAfter(dates.getAfterDate()))
                .filter(s -> s.getOrderDate().isBefore(dates.getBeforeDate()))
                .collect(Collectors.toList());
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
