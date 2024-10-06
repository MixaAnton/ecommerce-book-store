package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.dto.ProductCreate;
import com.example.springbootecommercebookstore.dto.ProductUpdate;
import com.example.springbootecommercebookstore.entity.Product;
import com.example.springbootecommercebookstore.services.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductServiceImpl productService;

    @GetMapping("/all")
    public Page<Product> getAllProducts(Pageable pageable, Principal principal){

        return productService.getAllProducts(pageable,principal);
    }

    @GetMapping("/single")
    public ResponseEntity<Product> getProduct(@RequestParam Long id)
    {
        return  ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/by-category")
    public Page<Product> getProductsByCategory(
            @RequestParam Long categoryId,
            Pageable pageable,Principal currentUser) {
        return productService.getProductsByCategory(categoryId, pageable,currentUser);
    }

    @GetMapping("/by-categories")
    public Page<Product> getProductsByCategories(
            @RequestParam List<Long> categoryIds,
            Pageable pageable,Principal currentUser) {
        return productService.getProductsByCategories(categoryIds, pageable,currentUser);
    }

    @GetMapping("/find-by-name")
    public Page<Product> getProductsByName(@RequestParam String name,Pageable pageable,Principal currentUser){
        return productService.findProductsByName(name,pageable,currentUser);
    }
    @GetMapping("/find-by-name-or-author")
    public Page<Product> getProductsByProductOrAuthor(@RequestParam String searchTerm,@RequestParam List<Long> categoryIds,Pageable pageable,Principal currentUser){
        return productService.findProductsByProductNameOrAuthor(searchTerm,categoryIds,pageable,currentUser);
    }

    @GetMapping("/last-three-products")
    public List<Product> getLastThreeProducts(){
        return productService.getLastThreeProducts();
    }

    @GetMapping("/filter-by-price")
    public Page<Product> getProductsByPriceRange(@RequestParam BigDecimal startPrice, @RequestParam BigDecimal endPrice,
                                                 @RequestParam List<Long> categoryIds , Pageable pageable,Principal currentUser){
        return productService.getAllProductsByPriceRange(startPrice,endPrice,categoryIds,pageable,currentUser);
    }

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody ProductCreate productCreate) throws IOException {

        Product product  = productService.createNewProduct(productCreate);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long productId,
            @RequestBody ProductUpdate productUpdate) {
        Product updatedProduct = productService.editProduct(productId, productUpdate);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }
}
