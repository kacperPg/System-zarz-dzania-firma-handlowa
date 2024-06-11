package com.kul.newbackend.mappers;

import com.kul.newbackend.dto.WarehouseDto;
import com.kul.newbackend.entities.Warehouse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
@Mapper(componentModel = "spring")
public interface WarehouseMapper {
    @Mapping(target = "warehouseId", ignore = true)
    Warehouse warehouseDtoToEntity(WarehouseDto warehouseDto);

    WarehouseDto warehouseEntityToDto(Warehouse warehouse);
    List<WarehouseDto> warehouseListToDtoList(List<Warehouse> warehouseList);
}

