package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.WarehouseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WarehouseStatusRepository extends JpaRepository<WarehouseStatus,Long> {
    List<WarehouseStatus> findByProductName(String productName);
    WarehouseStatus findFirstByProductName(String productName);
    List<WarehouseStatus> findByWarehouseId(Long warehouseId);
}
