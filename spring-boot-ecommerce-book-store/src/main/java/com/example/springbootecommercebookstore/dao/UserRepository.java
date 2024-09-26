package com.example.springbootecommercebookstore.dao;

import com.example.springbootecommercebookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    @Query(value = "SELECT * FROM User u WHERE u.username = :usernameOrEmail OR u.email = :usernameOrEmail",nativeQuery = true)
    Optional<User> findByUsernameOrEmail(@Param("username") String usernameOrEmail);
}
