package com.kul.newbackend.services;

import com.kul.newbackend.dto.WarehouseStatusDto;
import com.kul.newbackend.entities.Product;
import com.kul.newbackend.entities.Warehouse;
import com.kul.newbackend.entities.WarehouseStatus;
import com.kul.newbackend.mappers.WarehouseStatusMapper;
import com.kul.newbackend.repositories.ProductRepository;
import com.kul.newbackend.repositories.WarehouseRepository;
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
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;

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
        Product product = productRepository.findByProductName(productName);
        List<WarehouseStatus> warehouseStatusList = warehouseStatusRepository.findByProductId(product.getProductId());
        return warehouseStatusList.stream()
                .map(warehouseStatusMapper::warehouseStatusEntityToDto)
                .collect(Collectors.toList());
    }

    public List<WarehouseStatusDto> getWarehousesStatusByWarehouseName(String warehouseName) {
        Warehouse warehouse = warehouseRepository.findByWarehouseName(warehouseName);
        List<WarehouseStatus> warehouseStatusList = warehouseStatusRepository.findByWarehouseId(warehouse.getWarehouseId());
        return warehouseStatusList.stream()
                .map(warehouseStatusMapper::warehouseStatusEntityToDto)
                .collect(Collectors.toList());
    }

    public List<WarehouseStatusDto> getWarehousesStatusByProductNameAndWarehouseName(String productName, String warehouseName) {
        Product product = productRepository.findByProductName(productName);
        Warehouse warehouse = warehouseRepository.findByWarehouseName(warehouseName);
        List<WarehouseStatus> warehouseStatusList = warehouseStatusRepository.findByProductIdAndWarehouseId(product.getProductId(), warehouse.getWarehouseId());
        return warehouseStatusList.stream()
                .map(warehouseStatusMapper::warehouseStatusEntityToDto)
                .collect(Collectors.toList());
    }
}
