package com.kul.newbackend.services;

import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.entities.Product;
import com.kul.newbackend.mappers.ProductMapper;
import com.kul.newbackend.repositories.ProductRepository;
import com.kul.newbackend.repositories.ProductTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductTypeRepository productTypeRepository;

    public ProductDto addProduct(ProductDto productDto) {
        Product product = productMapper.productDtoToEntity(productDto);
        Product saveProduct = productRepository.save(product);
        return productMapper.productEntityToDto(saveProduct);
    }

    public List<ProductDto> getAllProducts() {
        List<Product> productEntities = productRepository.findAll();
        return productMapper.productListToDtoList(productEntities);
    }

    public ProductDto getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("Product not found"));
        return productMapper.productEntityToDto(product);
    }

    public ProductDto updateProduct(Long productId, ProductDto updatedProductDto) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("Product not found"));
        Product updatedProduct = productMapper.productDtoToEntity(updatedProductDto); // Convert DTO to entity

        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setTypeName(updatedProduct.getTypeName());

        Product savedProduct = productRepository.save(existingProduct);
        return productMapper.productEntityToDto(savedProduct);
    }

    public List<ProductDto> getProductsByType(String typeName){
        List<Product> products = productRepository.findByTypeName(typeName);
        if (products.isEmpty()) {
            throw new NoSuchElementException("No products found with the type name: " + typeName);
        }
        return productMapper.productListToDtoList(products);
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }
}
