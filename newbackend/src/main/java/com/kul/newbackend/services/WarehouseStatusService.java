package com.kul.newbackend.services;

import com.kul.newbackend.dto.WarehouseStatusDto;
import com.kul.newbackend.entities.WarehouseStatus;
import com.kul.newbackend.mappers.WarehouseStatusMapper;
import com.kul.newbackend.repositories.WarehouseStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class WarehouseStatusService {
    private final WarehouseStatusRepository warehouseStatusRepository;
    private final WarehouseStatusMapper warehouseStatusMapper;

    public WarehouseStatusDto addWarehouseStatus(WarehouseStatusDto warehouseStatusDto) {
        WarehouseStatus warehouseStatus = warehouseStatusMapper.warehouseStatusDtoToEntity(warehouseStatusDto);
        WarehouseStatus saveWarehouseStatus = warehouseStatusRepository.save(warehouseStatus);
        return warehouseStatusMapper.warehouseStatusEntityToDto(saveWarehouseStatus);
    }

    public List<WarehouseStatusDto> getAllWarehousesStatus() {
        List<WarehouseStatus> warehouseStatus = warehouseStatusRepository.findAll();
        return warehouseStatusMapper.warehouseStatusListToDtoList(warehouseStatus);
    }

    public WarehouseStatusDto getWarehouseStatusById(Long warehouseStatusId) {
        WarehouseStatus warehouseStatus = warehouseStatusRepository.findById(warehouseStatusId)
                .orElseThrow(() -> new NoSuchElementException("Warehouse Status not found"));
        return warehouseStatusMapper.warehouseStatusEntityToDto(warehouseStatus);
    }

    public WarehouseStatusDto updateWarehouseStatus(Long warehouseStatusId, WarehouseStatusDto updatedWarehouseStatusDto) {
        WarehouseStatus existingWarehouseStatus = warehouseStatusRepository.findById(warehouseStatusId)
                .orElseThrow(() -> new NoSuchElementException("Warehouse Status not found"));
        WarehouseStatus updatedWarehouseStatus = warehouseStatusMapper.warehouseStatusDtoToEntity(updatedWarehouseStatusDto); // Convert DTO to entity

        existingWarehouseStatus.setAvailableQuantity(updatedWarehouseStatus.getAvailableQuantity());
        existingWarehouseStatus.setSoldQuantity(updatedWarehouseStatus.getSoldQuantity());


        WarehouseStatus savedWarehouseStatus = warehouseStatusRepository.save(existingWarehouseStatus);
        return warehouseStatusMapper.warehouseStatusEntityToDto(savedWarehouseStatus);
    }

    public void deleteWarehouseStatus(Long warehouseStatusId) {
        warehouseStatusRepository.deleteById(warehouseStatusId);
    }

    public List<WarehouseStatusDto> getWarehousesStatusByProductName(String productName) {
        List<WarehouseStatus> warehouseStatusList = warehouseStatusRepository.findByProductName(productName);
        return warehouseStatusList.stream()
                .map(warehouseStatusMapper::warehouseStatusEntityToDto)
                .collect(Collectors.toList());
    }

    public List<WarehouseStatusDto> getWarehousesStatusByWarehouseName(String warehouseName) {
        List<WarehouseStatus> warehouseStatusList = warehouseStatusRepository.findByWarehouseName(warehouseName);
        return warehouseStatusList.stream()
                .map(warehouseStatusMapper::warehouseStatusEntityToDto)
                .collect(Collectors.toList());
    }
}
