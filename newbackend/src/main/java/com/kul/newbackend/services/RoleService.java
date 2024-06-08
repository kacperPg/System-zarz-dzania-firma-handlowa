package com.kul.newbackend.services;

import com.kul.newbackend.dto.RoleDto;
import com.kul.newbackend.entities.Role;
import com.kul.newbackend.mappers.RoleMapper;
import com.kul.newbackend.repositories.RoleRepository;
import com.kul.newbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public RoleDto addRole(RoleDto roleDto){
        Role role = roleMapper.roleDtoToEntity(roleDto);
        Role savedRole = roleRepository.save(role);
        return roleMapper.roleEntityToDto(savedRole);
    }

    public List<RoleDto> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return roleMapper.roleListToDtoList(roles);
    }

    public RoleDto getRoleById(Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new NoSuchElementException("Role not found"));
        return roleMapper.roleEntityToDto(role);
    }

    public RoleDto updateRole(Long roleId, RoleDto roleDto) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new NoSuchElementException("Role not found"));

        // Update existing entity's fields
        role.setRoleName(roleDto.getRoleName());
        role.setPermissions(roleDto.getPermissions());

        Role savedRole = roleRepository.save(role);
        return roleMapper.roleEntityToDto(savedRole);
    }

    public void deleteRole(Long roleId) {
        roleRepository.deleteById(roleId);
    }
}
