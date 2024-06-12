package com.kul.newbackend.mappers;

import com.kul.newbackend.dto.OrderItemsDto;
import com.kul.newbackend.entities.OrderItems;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderItemsMapper {
    @Mapping(target = "orderItemId", ignore = true)
    OrderItems orderItemsDtoToEntity(OrderItemsDto orderItemsDto);

    OrderItemsDto orderItemsEntityToDto(OrderItems orderItems);
    List<OrderItemsDto> orderItemsListToDtoList(List<OrderItems> orderItemsList);
}
