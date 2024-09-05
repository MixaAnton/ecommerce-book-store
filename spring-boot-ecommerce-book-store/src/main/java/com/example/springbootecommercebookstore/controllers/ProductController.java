package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.entity.Product;
import com.example.springbootecommercebookstore.services.ProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductServiceImp productService;

    @GetMapping("/all")
    public Page<Product> getAllProducts(Pageable pageable){

        return productService.getAllProducts(pageable);
    }

    @GetMapping("{id}")
    public Optional<Product> getProduct(@RequestParam Long id)
    {
        return productService.getProduct(id);
    }

    @GetMapping("/by-category")
    public Page<Product> getProductsByCategory(
            @RequestParam Long categoryId,
            Pageable pageable) {
        return productService.getProductsByCategory(categoryId, pageable);
    }

    @GetMapping("/by-categories")
    public Page<Product> getProductsByCategories(
            @RequestParam List<Long> categoryIds,
            Pageable pageable) {
        return productService.getProductsByCategories(categoryIds, pageable);
    }

    @GetMapping("/find-by-name")
    public Page<Product> getProductsByName(@RequestParam String name,Pageable pageable){
        return productService.findProductsByName(name,pageable);
    }

}
