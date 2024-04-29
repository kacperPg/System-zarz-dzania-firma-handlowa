package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductTypeRepository extends JpaRepository<ProductType,Long> {
}
