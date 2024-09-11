package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.entity.Language;
import com.example.springbootecommercebookstore.services.LanguageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/language")
@RestController
public class LanguageController {

    @Autowired
    LanguageServiceImpl languageService;

    @GetMapping("/all")
    List<Language> getAllLanguages(){
        return languageService.getAllLanguages();
    }
}
