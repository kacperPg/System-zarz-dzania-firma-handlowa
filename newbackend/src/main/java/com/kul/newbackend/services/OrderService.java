package com.kul.newbackend.services;

import com.kul.newbackend.config.CustomException;
import com.kul.newbackend.dto.OrderDto;
import com.kul.newbackend.dto.OrderItemsDto;
import com.kul.newbackend.dto.OrderSummaryDto;
import com.kul.newbackend.entities.*;
import com.kul.newbackend.mappers.ClientMapper;
import com.kul.newbackend.mappers.OrderItemsMapper;
import com.kul.newbackend.mappers.OrderMapper;
import com.kul.newbackend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final OrderItemsRepository orderItemsRepository;
    private final OrderItemsMapper orderItemsMapper;
    private final ProductRepository productRepository;
    private final WarehouseStatusRepository warehouseStatusRepository;
    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public OrderDto addOrder(OrderDto orderDto) {
        // Validacja lub inne operacje, które mogą rzucać wyjątki
        if (orderDto.getOrderItems() == null || orderDto.getOrderItems().isEmpty()) {
            throw new CustomException("Order must contain at least one item");
        }
        Client client = clientRepository.findById(orderDto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));
        Order order = orderMapper.orderDtoToEntity(orderDto);
        order.setClient(client);
        Order savedOrder = orderRepository.save(order);

        List<OrderItemsDto> orderItemsDtos = orderDto.getOrderItems();
        List<OrderItemsDto> savedOrderItemsDtos = new ArrayList<>();
        double totalPrice = 0.0;
        int totalAmount = 0;

        for (OrderItemsDto itemDto : orderItemsDtos) {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            Long warehouseId = itemDto.getWarehouseId();
            WarehouseStatus warehouseStatus = warehouseStatusRepository.findFirstByProductIdAndWarehouseId(product.getProductId(), warehouseId);

            if (warehouseStatus == null) {
                throw new CustomException("Warehouse status not found for the given product and warehouse");
            }
            int orderQuantity = itemDto.getQuantity();
            int availableQuantity = warehouseStatus.getAvailableQuantity();

            if (orderQuantity > availableQuantity) {
                throw new CustomException("Insufficient quantity available");
            }

            int updatedAvailableQuantity = availableQuantity - orderQuantity;
            int updatedSoldQuantity = warehouseStatus.getSoldQuantity() + orderQuantity;
            warehouseStatus.setAvailableQuantity(updatedAvailableQuantity);
            warehouseStatus.setSoldQuantity(updatedSoldQuantity);
            warehouseStatusRepository.save(warehouseStatus);


            double itemTotalPrice = product.getPrice() * itemDto.getQuantity();
            totalPrice += itemTotalPrice;
            totalAmount += itemDto.getQuantity();

            OrderItems orderItems = orderItemsMapper.orderItemsDtoToEntity(itemDto);
            orderItems.setOrderId(savedOrder.getOrderId());
            orderItems.setWarehouseId(warehouseStatus.getWarehouseId());

            orderItems.setPrice(itemTotalPrice);
            order.setTotalAmount(totalAmount);
            order.setTotalPrice(totalPrice);
            OrderItems savedOrderItems = orderItemsRepository.save(orderItems);
            savedOrderItemsDtos.add(orderItemsMapper.orderItemsEntityToDto(savedOrderItems));
        }
        OrderDto savedOrderDto = orderMapper.orderEntityToDto(savedOrder);
        savedOrderDto.setOrderItems(savedOrderItemsDtos);
        savedOrderDto.setClient(clientMapper.clientEntityToDto(client));
        return savedOrderDto;
    }


    public List<OrderDto> getAllOrders() {
        List<Order> orderEntities = orderRepository.findAll();
        return orderMapper.orderListToDtoList(orderEntities);
    }

    public List<OrderSummaryDto> getAllOrderSummaries() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(this::convertToOrderSummaryDto).collect(Collectors.toList());
    }

    private OrderSummaryDto convertToOrderSummaryDto(Order order) {
        String clientName = order.getClient().getClientName();
        return new OrderSummaryDto(
                order.getOrderId(),
                clientName,
                order.getOrderDate(),
                order.getTotalAmount(),
                order.getTotalPrice(),
                order.getStatus()
        );
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
