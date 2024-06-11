package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.ProductDto;


import com.kul.newbackend.services.ProductService;
import com.kul.newbackend.services.ProductTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final ProductTypeService productTypeService;

    @PreAuthorize("hasAuthority('PERM_ADD_PRODUCTS')")
    @PostMapping
    public ResponseEntity<ProductDto> addProduct(@RequestBody ProductDto productDto) {
        ProductDto addedProductDto = productService.addProduct(productDto);
        return new ResponseEntity<>(addedProductDto, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_PRODUCTS')")
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        for (ProductDto productDto : products) {
            productDto.setTypeName(productTypeService.getProductTypeById(productDto.getTypeId()).getTypeName());
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity<List<ProductDto>> GetAllProductsInPriceRange(@RequestBody PriceRange priceRange) {
//        List<ProductDto> products = productService.getAllProducts().stream()
//                .filter(s -> s.getPrice() > priceRange.getMinPrice())
//                .filter(s -> s.getPrice() > priceRange.getMaxPrice())
//                .collect(Collectors.toList());
//        return new ResponseEntity<>(products, HttpStatus.OK);
//    }

    @PreAuthorize("hasAuthority('PERM_VIEW_PRODUCTS')")
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long productId) {
        ProductDto product = productService.getProductById(productId);
        product.setTypeName(productTypeService.getProductTypeById(product.getTypeId()).getTypeName());
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('PERM_EDIT_PRODUCTS')")
    @PutMapping("/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long productId, @RequestBody ProductDto updatedProductDto) {
        ProductDto product = productService.updateProduct(productId, updatedProductDto);
        product.setTypeName(productTypeService.getProductTypeById(product.getTypeId()).getTypeName());
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('PERM_DELETE_PRODUCTS')")
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_PRODUCTS')")
    @GetMapping("/byType/{typeId}")
    public ResponseEntity<List<ProductDto>> getProductsByType(@PathVariable Long typeId) {
        List<ProductDto> products = productService.getProductsByTypeId(typeId);
        for (ProductDto productDto : products) {
            productDto.setTypeName(productTypeService.getProductTypeById(productDto.getTypeId()).getTypeName());
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
