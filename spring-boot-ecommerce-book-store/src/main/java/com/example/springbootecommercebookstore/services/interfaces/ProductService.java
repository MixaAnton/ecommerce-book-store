package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    Page<Product> getAllProducts(Pageable pageable);
    Page<Product> getProductsByCategory(Long categoryId,Pageable pageable);
    public Page<Product> getProductsByCategories(List<Long> categoryIds, Pageable pageable);
}
