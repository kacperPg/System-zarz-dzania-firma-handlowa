package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse,Long> {
    Warehouse findByWarehouseName(String warehouseName);
}
