package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.WarehouseDto;
import com.kul.newbackend.services.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {
    private final WarehouseService warehouseService;

    @PostMapping
    public ResponseEntity<WarehouseDto> addWarehouse(@RequestBody WarehouseDto warehouseDto) {
        WarehouseDto addedWarehouseDto = warehouseService.addWarehouse(warehouseDto);
        return new ResponseEntity<>(addedWarehouseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<WarehouseDto>> getAllWarehouses() {
        List<WarehouseDto> warehouses = warehouseService.getAllWarehouses();
        return new ResponseEntity<>(warehouses, HttpStatus.OK);
    }

    @GetMapping("/{warehouseId}")
    public ResponseEntity<WarehouseDto> getWarehouseById(@PathVariable Long warehouseId) {
        WarehouseDto warehouseDto = warehouseService.getWarehouseById(warehouseId);
        return new ResponseEntity<>(warehouseDto, HttpStatus.OK);
    }

    @PutMapping("/{warehouseId}")
    public ResponseEntity<WarehouseDto> updateWarehouse(@PathVariable Long warehouseId, @RequestBody WarehouseDto updatedWarehouseDto) {
        WarehouseDto warehouseDto = warehouseService.updateWarehouse(warehouseId, updatedWarehouseDto);
        return new ResponseEntity<>(warehouseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{warehouseId}")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable Long warehouseId) {
        warehouseService.deleteWarehouse(warehouseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
