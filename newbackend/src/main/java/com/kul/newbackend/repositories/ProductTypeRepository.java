package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductTypeRepository extends JpaRepository<ProductType,Long> {
    Optional<ProductType> findByTypeName(String typeName);
}
