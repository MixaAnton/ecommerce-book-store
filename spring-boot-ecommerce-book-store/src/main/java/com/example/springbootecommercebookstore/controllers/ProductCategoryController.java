package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.entity.ProductCategory;
import com.example.springbootecommercebookstore.services.ProductCategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/product-category/")
public class ProductCategoryController {

    @Autowired
    ProductCategoryServiceImpl productCategoryService;

    @GetMapping("all")
    List<ProductCategory> getAllCategories(){
        return productCategoryService.getAllCategories();
    }
}
