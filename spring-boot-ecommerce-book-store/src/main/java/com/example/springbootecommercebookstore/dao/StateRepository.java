package com.example.springbootecommercebookstore.dao;

import com.example.springbootecommercebookstore.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StateRepository extends JpaRepository<State,Integer> {

   List<State> findByCountryCode(@Param("code") String code);
}
