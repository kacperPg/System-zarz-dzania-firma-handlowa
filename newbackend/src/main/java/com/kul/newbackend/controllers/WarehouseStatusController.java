package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.WarehouseStatusDto;
import com.kul.newbackend.services.ProductService;
import com.kul.newbackend.services.WarehouseService;
import com.kul.newbackend.services.WarehouseStatusService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/warehousesStatus")
public class WarehouseStatusController {

    private static final Logger logger = LoggerFactory.getLogger(WarehouseStatusController.class);

    private final WarehouseService warehouseService;
    private final ProductService productService;
    private final WarehouseStatusService warehouseStatusService;

    @PreAuthorize("hasAuthority('PERM_ADD_STATUS')")
    @PostMapping
    public ResponseEntity<WarehouseStatusDto> addWarehouseStatus(@RequestBody WarehouseStatusDto warehouseStatusDto) {
        logger.info("Request to add warehouse status: {}", warehouseStatusDto);
        try {
            WarehouseStatusDto addedWarehouseStatusDto = warehouseStatusService.addWarehouseStatus(warehouseStatusDto);
            logger.info("Warehouse status added successfully: {}", addedWarehouseStatusDto);
            return new ResponseEntity<>(addedWarehouseStatusDto, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error while adding warehouse status: {}", warehouseStatusDto, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_STATUS')")
    @GetMapping
    public ResponseEntity<List<WarehouseStatusDto>> getAllWarehouses() {
        logger.info("Request to get all warehouse statuses");
        try {
            List<WarehouseStatusDto> warehousesStatus = warehouseStatusService.getAllWarehousesStatus();
            for (WarehouseStatusDto warehouseStatusDto : warehousesStatus) {
                warehouseStatusDto.setWarehouseName(
                        warehouseService.getWarehouseById(warehouseStatusDto.getWarehouseId()).getWarehouseName());
                warehouseStatusDto.setProductName(
                        productService.getProductById(warehouseStatusDto.getProductId()).getProductName());
            }
            logger.info("Retrieved {} warehouse statuses", warehousesStatus.size());
            return new ResponseEntity<>(warehousesStatus, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while retrieving warehouse statuses", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_STATUS')")
    @GetMapping("/{warehouseStatusId}")
    public ResponseEntity<WarehouseStatusDto> getWarehouseStatusById(@PathVariable Long warehouseStatusId) {
        logger.info("Request to get warehouse status by ID: {}", warehouseStatusId);
        try {
            WarehouseStatusDto warehouseStatusDto = warehouseStatusService.getWarehouseStatusById(warehouseStatusId);
            logger.info("Retrieved warehouse status: {}", warehouseStatusDto);
            return new ResponseEntity<>(warehouseStatusDto, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while retrieving warehouse status by ID: {}", warehouseStatusId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_EDIT_STATUS')")
    @PutMapping("/{warehouseStatusId}")
    public ResponseEntity<WarehouseStatusDto> updateWarehouseStatus(
            @PathVariable Long warehouseStatusId, @RequestBody WarehouseStatusDto updatedWarehouseStatusDto) {
        logger.info("Request to update warehouse status with ID: {}. Update data: {}", warehouseStatusId, updatedWarehouseStatusDto);
        try {
            WarehouseStatusDto warehouseStatusDto = warehouseStatusService.updateWarehouseStatus(warehouseStatusId, updatedWarehouseStatusDto);
            warehouseStatusDto.setWarehouseName(
                    warehouseService.getWarehouseById(warehouseStatusDto.getWarehouseId()).getWarehouseName());
            warehouseStatusDto.setProductName(
                    productService.getProductById(warehouseStatusDto.getProductId()).getProductName());
            logger.info("Warehouse status updated successfully: {}", warehouseStatusDto);
            return new ResponseEntity<>(warehouseStatusDto, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while updating warehouse status with ID: {}", warehouseStatusId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_DELETE_STATUS')")
    @DeleteMapping("/{warehouseStatusId}")
    public ResponseEntity<Void> deleteWarehouseStatus(@PathVariable Long warehouseStatusId) {
        logger.info("Request to delete warehouse status with ID: {}", warehouseStatusId);
        try {
            warehouseStatusService.deleteWarehouseStatus(warehouseStatusId);
            logger.info("Warehouse status deleted successfully with ID: {}", warehouseStatusId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            logger.error("Error while deleting warehouse status with ID: {}", warehouseStatusId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<WarehouseStatusDto>> getByProductNameOrWarehouseName(
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String warehouseName) {
        logger.info("Request to search warehouse statuses by productName: {} or warehouseName: {}", productName, warehouseName);
        try {
            List<WarehouseStatusDto> warehousesStatus;

            if (productName != null && !productName.isEmpty() && warehouseName != null && !warehouseName.isEmpty()) {
                warehousesStatus = warehouseStatusService.getWarehousesStatusByProductNameAndWarehouseName(productName, warehouseName);
            } else if (productName != null && !productName.isEmpty()) {
                warehousesStatus = warehouseStatusService.getWarehousesStatusByProductName(productName);
            } else if (warehouseName != null && !warehouseName.isEmpty()) {
                warehousesStatus = warehouseStatusService.getWarehousesStatusByWarehouseName(warehouseName);
            } else {
                logger.warn("Invalid search request: both productName and warehouseName are empty");
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            for (WarehouseStatusDto warehouseStatusDto : warehousesStatus) {
                warehouseStatusDto.setWarehouseName(
                        warehouseService.getWarehouseById(warehouseStatusDto.getWarehouseId()).getWarehouseName());
                warehouseStatusDto.setProductName(
                        productService.getProductById(warehouseStatusDto.getProductId()).getProductName());
            }

            logger.info("Retrieved {} warehouse statuses for search", warehousesStatus.size());
            return new ResponseEntity<>(warehousesStatus, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error while searching warehouse statuses", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
