package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.entity.ProductCategory;
import com.example.springbootecommercebookstore.services.ProductCategoryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/product-category/")
public class ProductCategoryController {

    @Autowired
    ProductCategoryServiceImp productCategoryService;

    @GetMapping("all")
    List<ProductCategory> getAllCategories(){
        return productCategoryService.getAllCategories();
    }
}
