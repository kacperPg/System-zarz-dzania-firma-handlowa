package com.kul.newbackend.controllers;


import com.kul.newbackend.dto.WarehouseStatusDto;
import com.kul.newbackend.services.WarehouseStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/warehousesStatus")
public class WarehouseStatusController {
    private final WarehouseStatusService warehouseStatusService;

    @PostMapping
    public ResponseEntity<WarehouseStatusDto> addWarehouseStatus(@RequestBody WarehouseStatusDto warehouseStatusDto) {
        WarehouseStatusDto addedWarehouseStatusDto = warehouseStatusService.addWarehouseStatus(warehouseStatusDto);
        return new ResponseEntity<>(addedWarehouseStatusDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<WarehouseStatusDto>> getAllWarehouses() {
        List<WarehouseStatusDto> warehousesStatus = warehouseStatusService.getAllWarehousesStatus();
        return new ResponseEntity<>(warehousesStatus, HttpStatus.OK);
    }

    @GetMapping("/{warehouseStatusId}")
    public ResponseEntity<WarehouseStatusDto> getWarehouseStatusById(@PathVariable Long warehouseStatusId) {
        WarehouseStatusDto warehouseStatusDto = warehouseStatusService.getWarehouseStatusById(warehouseStatusId);
        return new ResponseEntity<>(warehouseStatusDto, HttpStatus.OK);
    }

    @PutMapping("/{warehouseStatusId}")
    public ResponseEntity<WarehouseStatusDto> updateWarehouse(@PathVariable Long warehouseStatusId, @RequestBody WarehouseStatusDto updatedWarehouseStatusDto) {
        WarehouseStatusDto warehouseStatusDto = warehouseStatusService.updateWarehouseStatus(warehouseStatusId, updatedWarehouseStatusDto);
        return new ResponseEntity<>(warehouseStatusDto, HttpStatus.OK);
    }

    @DeleteMapping("/{warehouseStatusId}")
    public ResponseEntity<Void> deleteWarehouseStatus(@PathVariable Long warehouseStatusId) {
        warehouseStatusService.deleteWarehouseStatus(warehouseStatusId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
