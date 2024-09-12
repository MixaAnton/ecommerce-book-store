package com.example.springbootecommercebookstore.dao;

import com.example.springbootecommercebookstore.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status,Integer> {

    Status findByName(@Param("name") String name);
}
