package com.kul.newbackend.mappers;



import com.kul.newbackend.dto.ProductTypeDto;
import com.kul.newbackend.entities.ProductType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;


@Mapper(componentModel = "spring")
public interface ProductTypeMapper {
    @Mapping(target = "typeId", ignore = true)
    ProductType productTypeDtoToEntity(ProductTypeDto productTypeDtoDto);

    ProductTypeDto productTypeEntityToDto(ProductType productType);
    List<ProductTypeDto> productTypeListToDtoList(List<ProductType> productTypeList);


}
