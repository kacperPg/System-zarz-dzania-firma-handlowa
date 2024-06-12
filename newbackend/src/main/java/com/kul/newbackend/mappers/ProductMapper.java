package com.kul.newbackend.mappers;

import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "productId", ignore = true)
    Product productDtoToEntity(ProductDto productDto);

    ProductDto productEntityToDto(Product product);
    List<ProductDto> productListToDtoList(List<Product> productList);

}
