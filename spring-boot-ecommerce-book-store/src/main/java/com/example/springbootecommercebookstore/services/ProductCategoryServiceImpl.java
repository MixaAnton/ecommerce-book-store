package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.ProductCategoryRepository;
import com.example.springbootecommercebookstore.entity.ProductCategory;
import com.example.springbootecommercebookstore.services.interfaces.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    @Autowired
    ProductCategoryRepository productCategoryRepository;


    @Override
    public List<ProductCategory> getAllCategories() {
        return productCategoryRepository.findAll();
    }
}
