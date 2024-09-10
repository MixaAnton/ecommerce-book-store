package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.entity.Country;
import com.example.springbootecommercebookstore.services.CountryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    @Autowired
    CountryServiceImp countryServiceImp;

    @GetMapping("/all")
    public List<Country> getAllCountries(){
        return countryServiceImp.getAllCountries();
    }
}
