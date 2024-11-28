package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.WarehouseDto;
import com.kul.newbackend.services.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {

    private static final Logger logger = LoggerFactory.getLogger(WarehouseController.class);

    private final WarehouseService warehouseService;

    @PreAuthorize("hasAuthority('PERM_ADD_WAREHOUSES')")
    @PostMapping
    public ResponseEntity<WarehouseDto> addWarehouse(@RequestBody WarehouseDto warehouseDto) {
        logger.info("Request to add a warehouse: {}", warehouseDto);
        try {
            WarehouseDto addedWarehouseDto = warehouseService.addWarehouse(warehouseDto);
            logger.info("Warehouse added successfully: {}", addedWarehouseDto);
            return new ResponseEntity<>(addedWarehouseDto, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error while adding warehouse: {}", warehouseDto, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_WAREHOUSES')")
    @GetMapping
    public ResponseEntity<List<WarehouseDto>> getAllWarehouses() {
        logger.info("Request to get all warehouses");
        try {
            List<WarehouseDto> warehouses = warehouseService.getAllWarehouses();
            logger.info("Retrieved {} warehouses", warehouses.size());
            return new ResponseEntity<>(warehouses, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while retrieving all warehouses", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getWarehouseByLocation/{warehouseLocation}")
    public ResponseEntity<List<WarehouseDto>> getWarehouseByLocation(@PathVariable String warehouseLocation) {
        logger.info("Request to get warehouses by location: {}", warehouseLocation);
        try {
            List<WarehouseDto> warehouses = warehouseService.getAllWarehouses().stream()
                    .filter(s -> s.getLocation().equals(warehouseLocation))
                    .collect(Collectors.toList());
            logger.info("Retrieved {} warehouses for location: {}", warehouses.size(), warehouseLocation);
            return new ResponseEntity<>(warehouses, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while retrieving warehouses by location: {}", warehouseLocation, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_WAREHOUSES')")
    @GetMapping("/{warehouseId}")
    public ResponseEntity<WarehouseDto> getWarehouseById(@PathVariable Long warehouseId) {
        logger.info("Request to get warehouse by ID: {}", warehouseId);
        try {
            WarehouseDto warehouseDto = warehouseService.getWarehouseById(warehouseId);
            logger.info("Warehouse retrieved successfully: {}", warehouseDto);
            return new ResponseEntity<>(warehouseDto, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while retrieving warehouse by ID: {}", warehouseId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_EDIT_WAREHOUSES')")
    @PutMapping("/{warehouseId}")
    public ResponseEntity<WarehouseDto> updateWarehouse(@PathVariable Long warehouseId, @RequestBody WarehouseDto updatedWarehouseDto) {
        logger.info("Request to update warehouse with ID: {}. Update data: {}", warehouseId, updatedWarehouseDto);
        try {
            WarehouseDto warehouseDto = warehouseService.updateWarehouse(warehouseId, updatedWarehouseDto);
            logger.info("Warehouse updated successfully: {}", warehouseDto);
            return new ResponseEntity<>(warehouseDto, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while updating warehouse with ID: {}", warehouseId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_DELETE_WAREHOUSES')")
    @DeleteMapping("/{warehouseId}")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable Long warehouseId) {
        logger.info("Request to delete warehouse with ID: {}", warehouseId);
        try {
            warehouseService.deleteWarehouse(warehouseId);
            logger.info("Warehouse deleted successfully with ID: {}", warehouseId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            logger.error("Error while deleting warehouse with ID: {}", warehouseId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
