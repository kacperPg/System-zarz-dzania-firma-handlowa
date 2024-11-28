package com.kul.newbackend.controllers;

import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.services.ProductService;
import com.kul.newbackend.services.ProductTypeService;
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
@RequestMapping("/api/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    private final ProductService productService;
    private final ProductTypeService productTypeService;

    @PreAuthorize("hasAuthority('PERM_ADD_PRODUCTS')")
    @PostMapping
    public ResponseEntity<ProductDto> addProduct(@RequestBody ProductDto productDto) {
        logger.info("Request to add product: {}", productDto);
        try {
            ProductDto addedProductDto = productService.addProduct(productDto);
            logger.info("Product added successfully: {}", addedProductDto);
            return new ResponseEntity<>(addedProductDto, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error adding product: {}", productDto, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_PRODUCTS')")
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        logger.info("Request to get all products");
        try {
            List<ProductDto> products = productService.getAllProducts();
            for (ProductDto productDto : products) {
                productDto.setTypeName(productTypeService.getProductTypeById(productDto.getTypeId()).getTypeName());
            }
            logger.info("Retrieved {} products", products.size());
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving products", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_PRODUCTS')")
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long productId) {
        logger.info("Request to get product by ID: {}", productId);
        try {
            ProductDto product = productService.getProductById(productId);
            product.setTypeName(productTypeService.getProductTypeById(product.getTypeId()).getTypeName());
            logger.info("Product retrieved successfully: {}", product);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving product with ID: {}", productId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_EDIT_PRODUCTS')")
    @PutMapping("/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long productId, @RequestBody ProductDto updatedProductDto) {
        logger.info("Request to update product with ID: {}. Update data: {}", productId, updatedProductDto);
        try {
            ProductDto product = productService.updateProduct(productId, updatedProductDto);
            product.setTypeName(productTypeService.getProductTypeById(product.getTypeId()).getTypeName());
            logger.info("Product updated successfully: {}", product);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error updating product with ID: {}", productId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_DELETE_PRODUCTS')")
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        logger.info("Request to delete product with ID: {}", productId);
        try {
            productService.deleteProduct(productId);
            logger.info("Product deleted successfully with ID: {}", productId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            logger.error("Error deleting product with ID: {}", productId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('PERM_VIEW_PRODUCTS')")
    @GetMapping("/byType/{typeId}")
    public ResponseEntity<List<ProductDto>> getProductsByType(@PathVariable Long typeId) {
        logger.info("Request to get products by type ID: {}", typeId);
        try {
            List<ProductDto> products = productService.getProductsByTypeId(typeId);
            for (ProductDto productDto : products) {
                productDto.setTypeName(productTypeService.getProductTypeById(productDto.getTypeId()).getTypeName());
            }
            logger.info("Retrieved {} products for type ID: {}", products.size(), typeId);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving products by type ID: {}", typeId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
