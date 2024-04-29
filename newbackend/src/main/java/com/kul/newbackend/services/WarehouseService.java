package com.kul.newbackend.services;


import com.kul.newbackend.dto.WarehouseDto;
import com.kul.newbackend.entities.Warehouse;
import com.kul.newbackend.mappers.WarehouseMapper;
import com.kul.newbackend.repositories.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class WarehouseService {
    private final WarehouseRepository warehouseRepository;
    private final WarehouseMapper warehouseMapper;

    public WarehouseDto addWarehouse(WarehouseDto warehouseDto) {
        Warehouse warehouse = warehouseMapper.warehouseDtoToEntity(warehouseDto);
        Warehouse saveWarehouse = warehouseRepository.save(warehouse);
        return warehouseMapper.warehouseEntityToDto(saveWarehouse);
    }

    public List<WarehouseDto> getAllWarehouses() {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        return warehouseMapper.warehouseListToDtoList(warehouses);
    }

    public WarehouseDto getWarehouseById(Long warehouseId) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new NoSuchElementException("Warehouse not found"));
        return warehouseMapper.warehouseEntityToDto(warehouse);
    }

    public WarehouseDto updateWarehouse(Long warehouseId, WarehouseDto updatedWarehouseDto) {
        Warehouse existingWarehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new NoSuchElementException("Warehouse not found"));
        Warehouse updatedWarehouse = warehouseMapper.warehouseDtoToEntity(updatedWarehouseDto); // Convert DTO to entity

        existingWarehouse.setWarehouseName(updatedWarehouse.getWarehouseName());
        existingWarehouse.setLocation(updatedWarehouse.getLocation());


        Warehouse savedWarehouse = warehouseRepository.save(existingWarehouse);
        return warehouseMapper.warehouseEntityToDto(savedWarehouse);
    }

    public void deleteWarehouse(Long warehouseId) {
        warehouseRepository.deleteById(warehouseId);
    }
}
