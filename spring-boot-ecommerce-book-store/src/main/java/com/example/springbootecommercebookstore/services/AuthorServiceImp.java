package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.AuthorRepository;
import com.example.springbootecommercebookstore.entity.Author;
import com.example.springbootecommercebookstore.services.interfaces.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AuthorServiceImp implements AuthorService {

    @Autowired
    AuthorRepository authorRepository;

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }
}