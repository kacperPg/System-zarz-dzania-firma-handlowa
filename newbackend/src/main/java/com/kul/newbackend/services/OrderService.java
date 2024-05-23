package com.kul.newbackend.services;

import com.kul.newbackend.dto.OrderDto;
import com.kul.newbackend.dto.OrderItemsDto;
import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.entities.Order;
import com.kul.newbackend.entities.OrderItems;
import com.kul.newbackend.entities.Product;
import com.kul.newbackend.mappers.OrderItemsMapper;
import com.kul.newbackend.mappers.OrderMapper;
import com.kul.newbackend.repositories.OrderItemsRepository;
import com.kul.newbackend.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final OrderItemsRepository orderItemsRepository;
    private final OrderItemsMapper orderItemsMapper;

    public OrderDto addOrder(OrderDto orderDto) {
        Order order = orderMapper.orderDtoToEntity(orderDto);
        Order savedOrder = orderRepository.save(order);

        List<OrderItemsDto> orderItemsDtos = orderDto.getOrderItems();
        List<OrderItemsDto> savedOrderItemsDtos = new ArrayList<>();

        for (OrderItemsDto itemDto : orderItemsDtos) {
            OrderItems orderItems = orderItemsMapper.orderItemsDtoToEntity(itemDto);
            orderItems.setOrderId(savedOrder.getOrderId());
            OrderItems savedOrderItems = orderItemsRepository.save(orderItems);
            savedOrderItemsDtos.add(orderItemsMapper.orderItemsEntityToDto(savedOrderItems));
        }

        OrderDto savedOrderDto = orderMapper.orderEntityToDto(savedOrder);
        savedOrderDto.setOrderItems(savedOrderItemsDtos);
        return savedOrderDto;
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
