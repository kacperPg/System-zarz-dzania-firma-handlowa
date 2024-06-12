package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.WarehouseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WarehouseStatusRepository extends JpaRepository<WarehouseStatus,Long> {
    List<WarehouseStatus> findByWarehouseId(Long warehouseId);

    List<WarehouseStatus> findByProductIdAndWarehouseId(Long productId, Long warehouseId);
    WarehouseStatus findFirstByProductIdAndWarehouseId(Long productId, Long warehouseId);

    List<WarehouseStatus> findByProductId(Long productId);
}
