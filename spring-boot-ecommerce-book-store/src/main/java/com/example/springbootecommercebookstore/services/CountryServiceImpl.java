package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.CountryRepository;
import com.example.springbootecommercebookstore.entity.Country;
import com.example.springbootecommercebookstore.services.interfaces.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    CountryRepository countryRepository;

    @Override
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }
}
