package com.kul.newbackend.services;

import com.kul.newbackend.dto.OrderItemsDto;
import com.kul.newbackend.entities.OrderItems;
import com.kul.newbackend.mappers.OrderItemsMapper;
import com.kul.newbackend.repositories.OrderItemsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class OrderItemsService {
    private final OrderItemsRepository orderItemsRepository;
    private final OrderItemsMapper orderItemsMapper;
    private final WarehouseService warehouseService;
    private final ProductService productService;
    public OrderItemsDto addOrderItems(OrderItemsDto orderItemsDto) {
        OrderItems orderItems = orderItemsMapper.orderItemsDtoToEntity(orderItemsDto);
        OrderItems saveOrderItems = orderItemsRepository.save(orderItems);
        return orderItemsMapper.orderItemsEntityToDto(saveOrderItems);
    }

    public List<OrderItemsDto> getAllOrderItems() {
        List<OrderItems> orderItemsEntities = orderItemsRepository.findAll();
        List<OrderItemsDto> orderItemsDtos = orderItemsMapper.orderItemsListToDtoList(orderItemsEntities);
        for (OrderItemsDto orderItemsDto:orderItemsDtos) {
            orderItemsDto.setProductName(productService.getProductById(orderItemsDto.getProductId()).getProductName());
            orderItemsDto.setWarehouseName(warehouseService.getWarehouseById(orderItemsDto.getWarehouseId()).getWarehouseName());
        }
        return orderItemsDtos;
    }

    public OrderItemsDto getOrderItemById(Long orderItemId) {
        OrderItems orderItems = orderItemsRepository.findById(orderItemId)
                .orElseThrow(() -> new NoSuchElementException("Order Item not found"));
        return orderItemsMapper.orderItemsEntityToDto(orderItems);
    }

    public  List<OrderItemsDto> getOrderItemByOrderId(Long orderId) {
        List<OrderItems> orderItems = orderItemsRepository.findByOrderId(orderId);
        return orderItemsMapper.orderItemsListToDtoList(orderItems);
    }
    public OrderItemsDto updateOrder(Long orderItemId, OrderItemsDto updatedOrderItemDto) {
        OrderItems existingOrderItem = orderItemsRepository.findById(orderItemId)
                .orElseThrow(() -> new NoSuchElementException("Order item not found"));
        OrderItems updatedOrderItem = orderItemsMapper.orderItemsDtoToEntity(updatedOrderItemDto); // Convert DTO to entity

        existingOrderItem.setOrderId(updatedOrderItem.getOrderId());
        existingOrderItem.setQuantity(updatedOrderItem.getQuantity());
        existingOrderItem.setPrice(updatedOrderItem.getPrice());
        existingOrderItem.setProductId(updatedOrderItem.getProductId());
        existingOrderItem.setWarehouseId(updatedOrderItem.getWarehouseId());


        OrderItems savedOrderItems = orderItemsRepository.save(existingOrderItem);
        return orderItemsMapper.orderItemsEntityToDto(savedOrderItems);
    }

    public void deleteOrderItem(Long orderItemId) {
        orderItemsRepository.deleteById(orderItemId);
    }
}
