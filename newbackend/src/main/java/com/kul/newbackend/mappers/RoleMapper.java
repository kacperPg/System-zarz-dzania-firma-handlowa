package com.kul.newbackend.mappers;
import com.kul.newbackend.dto.RoleDto;
import com.kul.newbackend.entities.Role;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleDto toRoleDto(Role role);
}