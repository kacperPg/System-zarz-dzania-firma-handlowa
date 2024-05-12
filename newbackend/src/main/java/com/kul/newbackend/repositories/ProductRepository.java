package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.Product;
import com.kul.newbackend.entities.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByTypeName(String typeName);
}
