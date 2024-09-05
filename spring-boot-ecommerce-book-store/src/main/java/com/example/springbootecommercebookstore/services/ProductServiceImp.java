package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.ProductRepository;
import com.example.springbootecommercebookstore.entity.Product;
import com.example.springbootecommercebookstore.services.interfaces.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> getProductsByCategory(Long categoryId, Pageable pageable) {

        if(categoryId == 0)
            return  productRepository.findAll(pageable);
        return  productRepository.findByCategoryId(categoryId,pageable);
    }

    @Override
    public Page<Product> getProductsByCategories(List<Long> categoryIds, Pageable pageable) {

        if (categoryIds == null || categoryIds.isEmpty() || (categoryIds.contains(0L) && categoryIds.size()==1)) {
            return productRepository.findAll(pageable);
        } else {

            return productRepository.findByCategoryIdIn(categoryIds, pageable);
        }
    }

    @Override
    public Page<Product> findProductsByName(String name, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCase(name,pageable);
    }
}
