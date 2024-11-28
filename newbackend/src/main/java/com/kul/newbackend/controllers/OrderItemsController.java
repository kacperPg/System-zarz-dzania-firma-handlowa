package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.OrderItemsDto;
import com.kul.newbackend.services.OrderItemsService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orderItems")
public class OrderItemsController {
    private static final Logger logger = LoggerFactory.getLogger(OrderItemsController.class);

    private final OrderItemsService orderItemsService;

    @PreAuthorize("hasAuthority('PERM_ADD_ITEMS')")
    @PostMapping
    public ResponseEntity<OrderItemsDto> addOrder(@RequestBody OrderItemsDto orderItemsDto) {
        logger.info("Request to add order item: {}", orderItemsDto);
        try {
            OrderItemsDto addedOrderItemDto = orderItemsService.addOrderItems(orderItemsDto);
            logger.info("Order item added successfully: {}", addedOrderItemDto);
            return new ResponseEntity<>(addedOrderItemDto, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error adding order item: {}", orderItemsDto, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_ITEMS')")
    @GetMapping
    public ResponseEntity<List<OrderItemsDto>> getAllOrderItems() {
        logger.info("Request to retrieve all order items");
        try {
            List<OrderItemsDto> orderItems = orderItemsService.getAllOrderItems();
            logger.info("Retrieved {} order items successfully", orderItems.size());
            return new ResponseEntity<>(orderItems, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving all order items", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_ITEMS')")
    @GetMapping("/{orderItemId}")
    public ResponseEntity<OrderItemsDto> getOrderItemById(@PathVariable Long orderItemId) {
        logger.info("Request to retrieve order item by ID: {}", orderItemId);
        try {
            OrderItemsDto orderItems = orderItemsService.getOrderItemById(orderItemId);
            logger.info("Order item retrieved successfully: {}", orderItems);
            return new ResponseEntity<>(orderItems, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving order item by ID: {}", orderItemId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_EDIT_ITEMS')")
    @PutMapping("/{orderItemId}")
    public ResponseEntity<OrderItemsDto> updateOrderItem(@PathVariable Long orderItemId, @RequestBody OrderItemsDto updatedOrderItemDto) {
        logger.info("Request to update order item with ID: {}. Update data: {}", orderItemId, updatedOrderItemDto);
        try {
            OrderItemsDto orderItems = orderItemsService.updateOrder(orderItemId, updatedOrderItemDto);
            logger.info("Order item updated successfully: {}", orderItems);
            return new ResponseEntity<>(orderItems, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error updating order item with ID: {}", orderItemId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_DELETE_ITEMS')")
    @DeleteMapping("/{orderItemId}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable Long orderItemId) {
        logger.info("Request to delete order item with ID: {}", orderItemId);
        try {
            orderItemsService.deleteOrderItem(orderItemId);
            logger.info("Order item deleted successfully with ID: {}", orderItemId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            logger.error("Error deleting order item with ID: {}", orderItemId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_ITEMS')")
    @GetMapping("/orderId/{orderId}")
    public ResponseEntity<List<OrderItemsDto>> getOrderItemByOrderId(@PathVariable Long orderId) {
        logger.info("Request to retrieve order items for order ID: {}", orderId);
        try {
            List<OrderItemsDto> orderItems = orderItemsService.getOrderItemByOrderId(orderId);
            logger.info("Retrieved {} order items for order ID: {}", orderItems.size(), orderId);
            return new ResponseEntity<>(orderItems, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving order items for order ID: {}", orderId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
