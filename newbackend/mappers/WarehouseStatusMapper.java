package com.kul.newbackend.mappers;


import com.kul.newbackend.dto.WarehouseStatusDto;
import com.kul.newbackend.entities.WarehouseStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface WarehouseStatusMapper {
    @Mapping(target = "warehouseStatusId", ignore = true)
    WarehouseStatus warehouseStatusDtoToEntity(WarehouseStatusDto warehouseStatusDto);

    WarehouseStatusDto warehouseStatusEntityToDto(WarehouseStatus warehouseStatus);
    List<WarehouseStatusDto> warehouseStatusListToDtoList(List<WarehouseStatus> warehouseStatusList);
}
