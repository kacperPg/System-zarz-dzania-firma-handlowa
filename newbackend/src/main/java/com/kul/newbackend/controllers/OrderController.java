package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.*;
import com.kul.newbackend.entities.DateSet;
import com.kul.newbackend.services.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    private final OrderService orderService;
    private final OrderItemsService orderItemsService;
    private final ClientService clientService;
    private final ProductService productService;
    private final WarehouseService warehouseService;

    @PreAuthorize("hasAuthority('PERM_ADD_ORDER')")
    @PostMapping
    public ResponseEntity<OrderDto> addOrder(@RequestBody OrderDto orderDto) {
        logger.info("Request to add order: {}", orderDto);
        try {
            OrderDto addedOrderDto = orderService.addOrder(orderDto);
            logger.info("Order added successfully: {}", addedOrderDto);
            return new ResponseEntity<>(addedOrderDto, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error adding order: {}", orderDto, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_ORDER')")
    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        logger.info("Request to get all orders");
        try {
            List<OrderDto> orders = orderService.getAllOrders();
            orders.forEach(this::populateOrderDetails);
            logger.info("Retrieved {} orders successfully", orders.size());
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving all orders", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/summaries")
    public ResponseEntity<List<OrderSummaryDto>> getAllOrderSummaries() {
        logger.info("Request to get all order summaries");
        try {
            List<OrderSummaryDto> orderSummaries = orderService.getAllOrderSummaries();
            logger.info("Retrieved {} order summaries successfully", orderSummaries.size());
            return new ResponseEntity<>(orderSummaries, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving order summaries", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/orderBeforeDate")
    public ResponseEntity<List<OrderDto>> getAllOrdersBeforeDate(@RequestBody LocalDate date) {
        logger.info("Request to get all orders before date: {}", date);
        try {
            List<OrderDto> orders = orderService.getAllOrders().stream()
                    .filter(s -> s.getOrderDate().isBefore(date))
                    .collect(Collectors.toList());
            logger.info("Retrieved {} orders before date: {}", orders.size(), date);
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving orders before date: {}", date, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/orderAfterDate")
    public ResponseEntity<List<OrderDto>> getAllOrdersAfterDate(@RequestBody LocalDate date) {
        logger.info("Request to get all orders after date: {}", date);
        try {
            List<OrderDto> orders = orderService.getAllOrders().stream()
                    .filter(s -> s.getOrderDate().isAfter(date))
                    .collect(Collectors.toList());
            logger.info("Retrieved {} orders after date: {}", orders.size(), date);
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving orders after date: {}", date, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/orderBeetwenDate")
    public ResponseEntity<List<OrderDto>> getAllOrdersBeetwenDate(@RequestBody DateSet dates) {
        logger.info("Request to get all orders between dates: {} and {}", dates.getAfterDate(), dates.getBeforeDate());
        try {
            List<OrderDto> orders = orderService.getAllOrders().stream()
                    .filter(s -> s.getOrderDate().isAfter(dates.getAfterDate()))
                    .filter(s -> s.getOrderDate().isBefore(dates.getBeforeDate()))
                    .collect(Collectors.toList());
            logger.info("Retrieved {} orders between dates: {} and {}", orders.size(), dates.getAfterDate(), dates.getBeforeDate());
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving orders between dates: {} and {}", dates.getAfterDate(), dates.getBeforeDate(), e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_ORDER')")
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long orderId) {
        logger.info("Request to get order by ID: {}", orderId);
        try {
            OrderDto order = orderService.getOrderById(orderId);
            populateOrderDetails(order);
            logger.info("Order retrieved successfully: {}", order);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving order by ID: {}", orderId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_EDIT_ORDER')")
    @PutMapping("/{orderId}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable Long orderId, @RequestBody OrderDto updatedOrderDto) {
        logger.info("Request to update order with ID: {}. Update data: {}", orderId, updatedOrderDto);
        try {
            OrderDto order = orderService.updateOrder(orderId, updatedOrderDto);
            populateOrderDetails(order);
            logger.info("Order updated successfully: {}", order);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error updating order with ID: {}", orderId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_DELETE_ORDER')")
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        logger.info("Request to delete order with ID: {}", orderId);
        try {
            orderService.deleteOrder(orderId);
            logger.info("Order deleted successfully with ID: {}", orderId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            logger.error("Error deleting order with ID: {}", orderId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void populateOrderDetails(OrderDto order) {
        logger.info("Populating details for order ID: {}", order.getOrderId());
        try {
            List<OrderItemsDto> orderItemsDtoList = orderItemsService.getOrderItemByOrderId(order.getOrderId());
            ClientDto client = clientService.getClientById(order.getClientId());
            order.setClient(client);
            order.setOrderItems(orderItemsDtoList);
            for (OrderItemsDto orderItem : orderItemsDtoList) {
                ProductDto productDto = productService.getProductById(orderItem.getProductId());
                orderItem.setProductName(productDto.getProductName());
                orderItem.setWarehouseName(warehouseService.getWarehouseById(orderItem.getWarehouseId()).getWarehouseName());
            }
            logger.info("Details populated for order ID: {}", order.getOrderId());
        } catch (Exception e) {
            logger.error("Error populating details for order ID: {}", order.getOrderId(), e);
        }
    }
}
