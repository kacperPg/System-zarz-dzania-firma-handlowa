package com.kul.newbackend.services;

import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.dto.ProductTypeDto;
import com.kul.newbackend.entities.Product;
import com.kul.newbackend.entities.ProductType;
import com.kul.newbackend.mappers.ProductTypeMapper;
import com.kul.newbackend.repositories.ProductTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class ProductTypeService {
    private final ProductTypeRepository productTypeRepository;
    private final ProductTypeMapper productTypeMapper;

    public ProductTypeDto addProductType(ProductTypeDto productTypeDto){
        ProductType productType = productTypeMapper.productTypeDtoToEntity(productTypeDto);
        ProductType saveProductType = productTypeRepository.save(productType);
        return productTypeMapper.productTypeEntityToDto(saveProductType);
    }

    public List<ProductTypeDto> getAllProductTypes(){
        List<ProductType> productTypes = productTypeRepository.findAll();
        return productTypeMapper.productTypeListToDtoList(productTypes);
    }

    public ProductTypeDto getProductTypeById(Long typeId) {
        ProductType productType = productTypeRepository.findById(typeId)
                .orElseThrow(() -> new NoSuchElementException("Type not found"));
        return productTypeMapper.productTypeEntityToDto(productType);
    }

    public ProductTypeDto updateProductType(Long typeId, ProductTypeDto updatedTypeDto){
        ProductType existingType = productTypeRepository.findById(typeId)
                .orElseThrow(()-> new NoSuchElementException("Type not found"));
        ProductType updatedType = productTypeMapper.productTypeDtoToEntity(updatedTypeDto);

        existingType.setTypeName(updatedType.getTypeName());

        ProductType savedType = productTypeRepository.save(existingType);
        return productTypeMapper.productTypeEntityToDto(savedType);
    }

    public void deleteProductType(Long typeId){
        productTypeRepository.deleteById(typeId);
    }

}
