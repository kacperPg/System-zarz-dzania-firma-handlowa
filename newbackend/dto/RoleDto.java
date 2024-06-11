package com.kul.newbackend.dto;

import com.kul.newbackend.entities.Permission;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class RoleDto {
    private Long roleId;
    private String roleName;
    private Set<Permission> permissions;
}
