package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.ProductTypeDto;
import com.kul.newbackend.services.ProductTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/productTypes")
public class ProductTypeController {
    private final ProductTypeService productTypeService;
    @PreAuthorize("hasAuthority('PERM_ADD_TYPES')")
    @PostMapping
    public ResponseEntity<ProductTypeDto> addProductType(@RequestBody ProductTypeDto productTypeDto){
        ProductTypeDto addedProductTypeDto = productTypeService.addProductType(productTypeDto);
        return new ResponseEntity<>(addedProductTypeDto, HttpStatus.CREATED);
    }
    @PreAuthorize("hasAuthority('PERM_VIEW_TYPES')")
    @GetMapping
    public ResponseEntity<List<ProductTypeDto>> getAllProductTypes(){
        List<ProductTypeDto> productTypes = productTypeService.getAllProductTypes();
        return new ResponseEntity<>(productTypes,HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('PERM_VIEW_TYPES')")
    @GetMapping("/{typeId}")
    public ResponseEntity<ProductTypeDto> getProductTypeById(@PathVariable Long typeId){
        ProductTypeDto productTypeDto = productTypeService.getProductTypeById(typeId);
        return new ResponseEntity<>(productTypeDto,HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('PERM_EDIT_TYPES')")
    @PutMapping("/{typeId}")
    public ResponseEntity<ProductTypeDto> updateProductType(@PathVariable Long typeId,@RequestBody ProductTypeDto updatedProductTypeDto){
        ProductTypeDto productType = productTypeService.updateProductType(typeId,updatedProductTypeDto);
        return new ResponseEntity<>(productType,HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('PERM_DELETE_TYPES')")
    @DeleteMapping("/{typeId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long typeId){
        productTypeService.deleteProductType(typeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
