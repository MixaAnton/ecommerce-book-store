package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.LanguageRepository;
import com.example.springbootecommercebookstore.entity.Language;
import com.example.springbootecommercebookstore.services.interfaces.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class LanguageServiceImp implements LanguageService {

        @Autowired
        LanguageRepository languageRepository;

    @Override
    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }
}
