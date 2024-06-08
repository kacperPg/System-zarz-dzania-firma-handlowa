package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission,Long> {
}
