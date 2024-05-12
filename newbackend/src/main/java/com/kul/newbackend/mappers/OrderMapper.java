package com.kul.newbackend.mappers;

import com.kul.newbackend.dto.OrderDto;
import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.entities.Order;
import com.kul.newbackend.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mapping(target = "orderId", ignore = true)
    Order orderDtoToEntity(OrderDto orderDto);

    OrderDto orderEntityToDto(Order order);
    List<OrderDto> orderListToDtoList(List<Order> orderList);
}
