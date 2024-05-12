package com.kul.newbackend.services;

import com.kul.newbackend.dto.OrderDto;
import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.entities.Order;
import com.kul.newbackend.entities.Product;
import com.kul.newbackend.mappers.OrderMapper;
import com.kul.newbackend.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public OrderDto addOrder(OrderDto orderDto) {
        Order order = orderMapper.orderDtoToEntity(orderDto);
        Order saveOrder = orderRepository.save(order);
        return orderMapper.orderEntityToDto(saveOrder);
    }

    public List<OrderDto> getAllOrders() {
        List<Order> orderEntities = orderRepository.findAll();
        return orderMapper.orderListToDtoList(orderEntities);
    }

    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("Order not found"));
        return orderMapper.orderEntityToDto(order);
    }

    public OrderDto updateOrder(Long orderId, OrderDto updatedOrderDto) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("Order not found"));
        Order updatedOrder = orderMapper.orderDtoToEntity(updatedOrderDto); // Convert DTO to entity

        existingOrder.setClientId(updatedOrder.getClientId());
        existingOrder.setTotalAmount(updatedOrder.getTotalAmount());
        existingOrder.setOrderDate(updatedOrder.getOrderDate());
        existingOrder.setStatus(updatedOrder.getStatus());


        Order savedOrder = orderRepository.save(existingOrder);
        return orderMapper.orderEntityToDto(savedOrder);
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}
