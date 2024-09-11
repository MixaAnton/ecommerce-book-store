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
import java.util.Random;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    public Product getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return product.get();
        } else {
            throw new RuntimeException("Product not found with ID: " + id);
        }
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

    @Override
    public List<Product> getLastThreeProducts() {
        return productRepository.findTop3ByOrderByDateCreatedDesc();
    }

    public static String generateRandomISBN13() {
        Random random = new Random();

        StringBuilder isbn = new StringBuilder("978");

        for (int i = 0; i < 9; i++) {
            isbn.append(random.nextInt(10));
        }

        int checksum = 0;
        for (int i = 0; i < isbn.length(); i++) {
            int digit = Character.getNumericValue(isbn.charAt(i));
            checksum += (i % 2 == 0) ? digit : digit * 3;
        }
        int checkDigit = 10 - (checksum % 10);
        if (checkDigit == 10) {
            checkDigit = 0;
        }

        isbn.append(checkDigit);
        return isbn.toString();
    }
}
