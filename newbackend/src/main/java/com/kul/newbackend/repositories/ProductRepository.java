package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {

    List<Product> findByTypeId(Long typeId);

    Product findByProductName(String productName);
}
