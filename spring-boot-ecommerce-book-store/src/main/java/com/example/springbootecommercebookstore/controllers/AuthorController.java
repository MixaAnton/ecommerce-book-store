package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.entity.Author;

import com.example.springbootecommercebookstore.services.AuthorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/author")
public class AuthorController {

    @Autowired
    AuthorServiceImpl authorService;

    @GetMapping("/all")
    List<Author> getAllCategories(){
        return authorService.getAllAuthors();
    }
}
