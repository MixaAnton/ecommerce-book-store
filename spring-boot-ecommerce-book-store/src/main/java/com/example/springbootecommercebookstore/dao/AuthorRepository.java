package com.example.springbootecommercebookstore.dao;

import com.example.springbootecommercebookstore.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {
}
