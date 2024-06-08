package com.kul.newbackend.repositories;

import com.kul.newbackend.entities.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository <User,Long>{

     @EntityGraph(attributePaths = {"role"})
     Optional<User> findByEmail(String email);
}
