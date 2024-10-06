package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.ProductRepository;
import com.example.springbootecommercebookstore.dto.ProductCreate;
import com.example.springbootecommercebookstore.dto.ProductUpdate;
import com.example.springbootecommercebookstore.entity.*;
import com.example.springbootecommercebookstore.enums.RoleEnum;
import com.example.springbootecommercebookstore.services.interfaces.AuthorService;
import com.example.springbootecommercebookstore.services.interfaces.LanguageService;
import com.example.springbootecommercebookstore.services.interfaces.ProductCategoryService;
import com.example.springbootecommercebookstore.services.interfaces.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    AuthorService authorService;

    @Autowired
    LanguageService languageService;

    @Autowired
    ProductCategoryService productCategoryService;

    public Product getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return product.get();
        } else {
            throw new RuntimeException("Product not found with ID: " + id);
        }
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable, Principal currentUser) {

        Boolean active = hasRoleUser(currentUser);
       // Boolean active = null;
        Pageable pageableNative = createPageableWithCustomSort(pageable);

        return  productRepository.findAllWithActive(active,pageableNative);
    }

    @Override
    public Page<Product> getProductsByCategory(Long categoryId, Pageable pageable,Principal currentUser) {


        Boolean active = hasRoleUser(currentUser);
        Pageable pageableNative = createPageableWithCustomSort(pageable);

        if(categoryId == 0)
            return  productRepository.findAllWithActive(active,pageableNative);
        return  productRepository.findByCategoryId(categoryId,active,pageableNative);
    }

    @Override
    public Page<Product> getProductsByCategories(List<Long> categoryIds, Pageable pageable,Principal currentUser) {


        Boolean active = hasRoleUser(currentUser);
        Pageable pageableNative = createPageableWithCustomSort(pageable);

        if (categoryIds == null || categoryIds.isEmpty() || (categoryIds.contains(0L) && categoryIds.size()==1)) {
            return productRepository.findAllWithActive(active,pageableNative);
        } else {

            return productRepository.findByCategoryIdIn(categoryIds,active,pageableNative);
        }
    }

    @Override
    public Page<Product> findProductsByName(String name, Pageable pageable,Principal currentUser) {

        Boolean active = hasRoleUser(currentUser);
        Pageable pageableNative = createPageableWithCustomSort(pageable);
        return productRepository.findByNameContainingIgnoreCase(name,active,pageableNative);
    }

    @Override
    public Page<Product> findProductsByProductNameOrAuthor(String searchTerm,List<Long> categoryIds, Pageable pageable,Principal currentUser) {

        Boolean active = hasRoleUser(currentUser);
        Pageable pageableNative = createPageableWithCustomSort(pageable);

        if (categoryIds == null || categoryIds.isEmpty() || categoryIds.contains(0L))
            return productRepository.findByProductNameOrAuthorName(searchTerm,active,pageableNative);
        return productRepository.findByProductNameOrAuthorNameIncludeCategories(searchTerm,categoryIds,active,pageableNative);

    }

    @Override
    public Page<Product> getAllProductsByPriceRange(BigDecimal startPrice, BigDecimal endPrice, List<Long> categoryIds, Pageable pageable,Principal currentUser) {

        Boolean active = hasRoleUser(currentUser);
        Pageable pageableNative = createPageableWithCustomSort(pageable);

        if (categoryIds == null || categoryIds.isEmpty() || categoryIds.contains(0L))
            return productRepository.filterByPrice(startPrice,endPrice,active,pageableNative);
        return productRepository.filterByPriceIncludeCategories(startPrice,endPrice,categoryIds,active,pageableNative);
    }

    @Override
    public List<Product> getLastThreeProducts() {
        return productRepository.findTop3ByActiveTrueOrderByDateCreatedDesc();
    }

    @Override
    @Transactional
    public Product createNewProduct(ProductCreate productCreate) {
        Product product = new Product();
        product.setUnitPrice(productCreate.getUnitPrice());
        product.setActive(productCreate.getUnitsInStock()>1);
        product.setIsbn(generateRandomISBN13());
        product.setName(productCreate.getName());
        product.setNumOfPages(productCreate.getNumOfPages());
        product.setDescription(productCreate.getDescription());
        product.setYearOfPublication(productCreate.getYearOfPublication());
        product.setImageExtension(productCreate.getImageExtension());

        if(productCreate.getImage()!=null)
            product.setImage(productCreate.getImage().getBytes());

        Author author = authorService.getAuthorById(productCreate.getAuthorId());
        Language language = languageService.getLanguageById(productCreate.getLanguageId());
        ProductCategory category = productCategoryService.getCategoryById(productCreate.getCategoryId());

        product.setAuthor(author);
        product.setLanguage(language);
        product.setCategory(category);

        return productRepository.save(product);
    }

    @Override
    @Transactional
    public Product editProduct(Long id, ProductUpdate productUpdate) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        existingProduct.setUnitPrice(productUpdate.getUnitPrice());
        existingProduct.setActive(productUpdate.getUnitsInStock() > 1);
        existingProduct.setNumOfPages(productUpdate.getNumOfPages());
        existingProduct.setDescription(productUpdate.getDescription());
        existingProduct.setYearOfPublication(productUpdate.getYearOfPublication());
        existingProduct.setImageExtension(productUpdate.getImageExtension());
        existingProduct.setUnitsInStock(productUpdate.getUnitsInStock());

        if (productUpdate.getImage() != null) {
            existingProduct.setImage(productUpdate.getImage().getBytes());
        }

        if (productUpdate.getLanguageId() != existingProduct.getLanguage().getId()) {
            Language language = languageService.getLanguageById(productUpdate.getLanguageId());
            existingProduct.setLanguage(language);
        }

        return productRepository.save(existingProduct);
    }

    @Override
    @Transactional
    public void deleteProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        product.setActive(false);
        product.setUnitsInStock(0);

        productRepository.save(product);
    }

    @Override
    public void reduceNumberOfProductsInStock(Long productId, int numberOfUnits) {
        var product = productRepository.findById(productId).orElseThrow();
        product.setUnitsInStock(product.getUnitsInStock()-numberOfUnits);

        productRepository.save(product);
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

    public Pageable createPageableWithCustomSort(Pageable pageable) {

        Sort.Order order = pageable.getSort().stream().findFirst().orElse(null);

        String sortColumn = "date_created";
        Sort.Direction sortDirection = Sort.Direction.DESC;

        if (order != null) {
            sortColumn = order.getProperty().equals("dateCreated") ? "date_created" : "unit_price";
            sortDirection = order.getDirection();
        }

        return PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(sortDirection, sortColumn)
        );
    }

    public Boolean hasRoleUser(Principal currentUser){

        if(currentUser == null)
            return true;

        var existingUser = (User) ((UsernamePasswordAuthenticationToken) currentUser).getPrincipal();

        var roles = existingUser.getRoles();

        return roles.stream()
                .anyMatch(role -> role.getName().equals(RoleEnum.USER.getRole())) ? true : null;
    }
}
