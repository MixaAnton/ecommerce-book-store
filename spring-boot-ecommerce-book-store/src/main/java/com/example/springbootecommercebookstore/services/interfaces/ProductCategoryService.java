package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.entity.ProductCategory;

import java.util.List;

public interface ProductCategoryService {
    List<ProductCategory> getAllCategories();
    ProductCategory getCategoryById(Long id);
}
