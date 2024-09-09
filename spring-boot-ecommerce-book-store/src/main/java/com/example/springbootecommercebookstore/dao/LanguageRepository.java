package com.example.springbootecommercebookstore.dao;

import com.example.springbootecommercebookstore.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageRepository extends JpaRepository<Language,Integer> {
}
