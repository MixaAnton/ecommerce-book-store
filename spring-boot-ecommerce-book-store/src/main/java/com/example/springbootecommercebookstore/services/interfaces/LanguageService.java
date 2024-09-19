package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.entity.Language;

import java.util.List;

public interface LanguageService {

    List<Language> getAllLanguages();
    Language getLanguageById(Integer id);
}
