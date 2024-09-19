package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.dto.ProductCreate;
import com.example.springbootecommercebookstore.entity.Product;
import com.example.springbootecommercebookstore.services.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductServiceImpl productService;

    @GetMapping("/all")
    public Page<Product> getAllProducts(Pageable pageable){

        return productService.getAllProducts(pageable);
    }

    @GetMapping("/single")
    public ResponseEntity<Product> getProduct(@RequestParam Long id)
    {
        return  ResponseEntity.ok(productService.getProductById(id));
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
    @GetMapping("/find-by-name-or-author")
    public Page<Product> getProductsByProductOrAuthor(@RequestParam String searchTerm,@RequestParam List<Long> categoryIds,Pageable pageable){
        return productService.findProductsByProductNameOrAuthor(searchTerm,categoryIds,pageable);
    }

    @GetMapping("/last-three-products")
    public List<Product> getLastThreeProducts(){
        return productService.getLastThreeProducts();
    }

    @GetMapping("/filter-by-price")
    public Page<Product> getProductsByPriceRange(@RequestParam BigDecimal startPrice, @RequestParam BigDecimal endPrice,@RequestParam List<Long> categoryIds , Pageable pageable){
        return productService.getAllProductsByPriceRange(startPrice,endPrice,categoryIds,pageable);
    }

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody ProductCreate productCreate) throws IOException {

        Product product  = productService.createNewProduct(productCreate);
        return ResponseEntity.ok(product);
    }

}
