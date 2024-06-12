package com.kul.newbackend.controllers;


import com.kul.newbackend.dto.RoleDto;
import com.kul.newbackend.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleService roleService;

    @PostMapping
    public ResponseEntity<RoleDto> addRole(@RequestBody RoleDto roleDto){
        RoleDto addedRole = roleService.addRole(roleDto);
        return new ResponseEntity<>(addedRole, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RoleDto>> getAllRoles(){
        List<RoleDto> roleDtos = roleService.getAllRoles();
        return new ResponseEntity<>(roleDtos,HttpStatus.OK);
    }

    @GetMapping("/{roleId}")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable Long roleId){
        RoleDto roleDto = roleService.getRoleById(roleId);
        return new ResponseEntity<>(roleDto,HttpStatus.OK);
    }

    @PutMapping("/{roleId}")
    public ResponseEntity<RoleDto> updateRole(@PathVariable Long roleId,@RequestBody RoleDto roleDto){
        RoleDto roleDtos = roleService.updateRole(roleId,roleDto);
        return new ResponseEntity<>(roleDtos,HttpStatus.OK);
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long roleId){
        roleService.deleteRole(roleId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
