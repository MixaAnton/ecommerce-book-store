package com.example.springbootecommercebookstore.dao;

import com.example.springbootecommercebookstore.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country,Integer> {
}
