package com.kul.newbackend.services;

import com.kul.newbackend.dto.RoleDto;
import com.kul.newbackend.entities.Role;
import com.kul.newbackend.entities.User;
import com.kul.newbackend.repositories.RoleRepository;
import com.kul.newbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@RequiredArgsConstructor
@Service
public class RoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public Role findById(Long roleId){
        return roleRepository.findById(roleId)
                .orElseThrow(()-> new RuntimeException("Role not found"));
    }

    public Role saveRole(Role role){
        return roleRepository.save(role);
    }

    public Role findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Unknown user"));
        return user.getRole();
    }

}
