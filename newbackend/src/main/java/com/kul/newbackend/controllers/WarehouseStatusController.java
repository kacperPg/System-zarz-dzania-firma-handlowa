package com.kul.newbackend.controllers;


import com.kul.newbackend.dto.WarehouseStatusDto;
import com.kul.newbackend.services.WarehouseService;
import com.kul.newbackend.services.WarehouseStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/warehousesStatus")
public class WarehouseStatusController {
    private final WarehouseService warehouseService;
    private final WarehouseStatusService warehouseStatusService;

    @PreAuthorize("hasAuthority('PERM_ADD_STATUS')")
    @PostMapping
    public ResponseEntity<WarehouseStatusDto> addWarehouseStatus(@RequestBody WarehouseStatusDto warehouseStatusDto) {
        WarehouseStatusDto addedWarehouseStatusDto = warehouseStatusService.addWarehouseStatus(warehouseStatusDto);
        return new ResponseEntity<>(addedWarehouseStatusDto, HttpStatus.CREATED);
    }
    @PreAuthorize("hasAuthority('PERM_VIEW_STATUS')")
    @GetMapping
    public ResponseEntity<List<WarehouseStatusDto>> getAllWarehouses() {
        List<WarehouseStatusDto> warehousesStatus = warehouseStatusService.getAllWarehousesStatus();
        for (WarehouseStatusDto warehouseStatusDto : warehousesStatus) {
            warehouseStatusDto.setWarehouseName(warehouseService.getWarehouseById(warehouseStatusDto.getWarehouseId()).getWarehouseName());
        }
        return new ResponseEntity<>(warehousesStatus, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_STATUS')")
    @GetMapping("/{warehouseStatusId}")
    public ResponseEntity<WarehouseStatusDto> getWarehouseStatusById(@PathVariable Long warehouseStatusId) {
        WarehouseStatusDto warehouseStatusDto = warehouseStatusService.getWarehouseStatusById(warehouseStatusId);
        return new ResponseEntity<>(warehouseStatusDto, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('PERM_EDIT_STATUS')")
    @PutMapping("/{warehouseStatusId}")
    public ResponseEntity<WarehouseStatusDto> updateWarehouse(@PathVariable Long warehouseStatusId, @RequestBody WarehouseStatusDto updatedWarehouseStatusDto) {
        WarehouseStatusDto warehouseStatusDto = warehouseStatusService.updateWarehouseStatus(warehouseStatusId, updatedWarehouseStatusDto);
        warehouseStatusDto.setWarehouseName(warehouseService.getWarehouseById(warehouseStatusDto.getWarehouseId()).getWarehouseName());
        return new ResponseEntity<>(warehouseStatusDto, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('PERM_DELETE_STATUS')")
    @DeleteMapping("/{warehouseStatusId}")
    public ResponseEntity<Void> deleteWarehouseStatus(@PathVariable Long warehouseStatusId) {
        warehouseStatusService.deleteWarehouseStatus(warehouseStatusId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<WarehouseStatusDto>> getByProductNameOrWarehouseName(
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String warehouseName) {
        List<WarehouseStatusDto> warehousesStatus;

        if (productName != null && !productName.isEmpty() && warehouseName != null && !warehouseName.isEmpty()) {
            warehousesStatus = warehouseStatusService.getWarehousesStatusByProductNameAndWarehouseName(productName, warehouseName);
        } else if (productName != null && !productName.isEmpty()) {
            warehousesStatus = warehouseStatusService.getWarehousesStatusByProductName(productName);
        } else if (warehouseName != null && !warehouseName.isEmpty()) {
            warehousesStatus = warehouseStatusService.getWarehousesStatusByWarehouseName(warehouseName);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(warehousesStatus, HttpStatus.OK);
    }
}
