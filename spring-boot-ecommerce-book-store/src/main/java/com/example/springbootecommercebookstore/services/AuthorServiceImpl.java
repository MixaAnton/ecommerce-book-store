package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.AuthorRepository;
import com.example.springbootecommercebookstore.entity.Author;
import com.example.springbootecommercebookstore.services.interfaces.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    AuthorRepository authorRepository;

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Author getAuthorById(Integer id) {
        Optional<Author> optionalAuthor =  authorRepository.findById(id);
        return optionalAuthor.orElse(null);
    }
}
