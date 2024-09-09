package com.example.springbootecommercebookstore.dao;

import com.example.springbootecommercebookstore.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StateRepository extends JpaRepository<State,Integer> {
}
