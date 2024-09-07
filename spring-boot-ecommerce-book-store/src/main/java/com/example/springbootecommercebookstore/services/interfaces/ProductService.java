package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product getProductById(Long id);
    Page<Product> getAllProducts(Pageable pageable);
    Page<Product> getProductsByCategory(Long categoryId,Pageable pageable);
    Page<Product> getProductsByCategories(List<Long> categoryIds, Pageable pageable);
    Page<Product> findProductsByName(String name,Pageable pageable);
    
}
