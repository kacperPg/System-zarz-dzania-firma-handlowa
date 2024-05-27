package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Long> {
}
