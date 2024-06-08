package com.kul.newbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PermissionDto {
    private Long permissionId;
    private String permissionName;
    private String description;
}
