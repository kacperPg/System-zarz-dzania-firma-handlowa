package com.kul.newbackend.mappers;

import com.kul.newbackend.dto.OrderDto;
import com.kul.newbackend.entities.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ClientMapper.class})
public interface OrderMapper {
    @Mapping(target = "orderId", ignore = true)
    @Mapping(source = "clientId",target = "client.clientId")
    Order orderDtoToEntity(OrderDto orderDto);

    @Mapping(source = "clientId",target = "client.clientId")
    OrderDto orderEntityToDto(Order order);
    List<OrderDto> orderListToDtoList(List<Order> orderList);
}
