package com.kul.newbackend.mappers;
import com.kul.newbackend.dto.ProductDto;
import com.kul.newbackend.dto.RoleDto;
import com.kul.newbackend.entities.Product;
import com.kul.newbackend.entities.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "roleId", ignore = true)
    Role roleDtoToEntity(RoleDto roleDto);

    RoleDto roleEntityToDto(Role role);
    List<RoleDto> roleListToDtoList(List<Role> roleList);
}