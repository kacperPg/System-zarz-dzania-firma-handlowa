package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.OrderItemsDto;
import com.kul.newbackend.services.OrderItemsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orderItems")
public class OrderItemsController {
    private final OrderItemsService orderItemsService;
    @PreAuthorize("hasAuthority('PERM_ADD_ITEMS')")
    @PostMapping
    public ResponseEntity<OrderItemsDto> addOrder(@RequestBody OrderItemsDto orderItemsDto) {
        OrderItemsDto addedOrderItemDto = orderItemsService.addOrderItems(orderItemsDto);
        return new ResponseEntity<>(addedOrderItemDto, HttpStatus.CREATED);
    }
    @PreAuthorize("hasAuthority('PERM_VIEW_ITEMS')")
    @GetMapping
    public ResponseEntity<List<OrderItemsDto>> getAllOrderItems() {
        List<OrderItemsDto> orderItems = orderItemsService.getAllOrderItems();
        return new ResponseEntity<>(orderItems, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('PERM_VIEW_ITEMS')")
    @GetMapping("/{orderItemId}")
    public ResponseEntity<OrderItemsDto> getOrderItemById(@PathVariable Long orderItemId) {
        OrderItemsDto orderItems = orderItemsService.getOrderItemById(orderItemId);
        return new ResponseEntity<>(orderItems, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('PERM_EDIT_ITEMS')")
    @PutMapping("/{orderItemId}")
    public ResponseEntity<OrderItemsDto> updateOrderItem(@PathVariable Long orderItemId, @RequestBody OrderItemsDto updatedOrderItemDto) {
        OrderItemsDto orderItems = orderItemsService.updateOrder(orderItemId, updatedOrderItemDto);
        return new ResponseEntity<>(orderItems, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('PERM_DELETE_ITEMS')")
    @DeleteMapping("/{orderItemId}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable Long orderItemId) {
        orderItemsService.deleteOrderItem(orderItemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PreAuthorize("hasAuthority('PERM_VIEW_ITEMS')")
    @GetMapping("/orderId/{orderId}")
    public ResponseEntity<List<OrderItemsDto>> getOrderItemByOrderId(@PathVariable Long orderId) {
        List<OrderItemsDto> orderItems = orderItemsService.getOrderItemByOrderId(orderId);
        return new ResponseEntity<>(orderItems,HttpStatus.OK);
    }
}
