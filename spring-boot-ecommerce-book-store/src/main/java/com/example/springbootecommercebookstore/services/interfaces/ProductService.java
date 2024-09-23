package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.dto.ProductCreate;
import com.example.springbootecommercebookstore.dto.ProductUpdate;
import com.example.springbootecommercebookstore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product getProductById(Long id);
    Page<Product> getAllProducts(Pageable pageable);
    Page<Product> getProductsByCategory(Long categoryId,Pageable pageable);
    Page<Product> getProductsByCategories(List<Long> categoryIds, Pageable pageable);
    Page<Product> findProductsByName(String name,Pageable pageable);
    Page<Product> findProductsByProductNameOrAuthor(String searchTerm,List<Long> categoryIds,Pageable pageable);
    Page<Product> getAllProductsByPriceRange(BigDecimal startPrice, BigDecimal endPrice,List<Long> categoryIds,Pageable pageable);
    List<Product> getLastThreeProducts();
    Product createNewProduct(ProductCreate productCreate);
    Product editProduct(Long id, ProductUpdate productUpdate);
    void deleteProduct(Long productId);

}
