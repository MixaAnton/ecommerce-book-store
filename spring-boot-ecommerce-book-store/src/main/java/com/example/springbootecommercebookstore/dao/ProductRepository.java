package com.example.springbootecommercebookstore.dao;


import com.example.springbootecommercebookstore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin("http://localhost:4200")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM Product p " +
            "WHERE (:active IS NULL OR p.active = :active)",
            nativeQuery = true)
    Page<Product> findAllWithActive(@Param("active") Boolean active,
                                    Pageable pageable);

    @Query(value = "SELECT * FROM Product p " +
            "WHERE p.category_id = :id " +
            "AND (:active IS NULL OR p.active = :active)",
            nativeQuery = true)
    Page<Product> findByCategoryId(@Param("id") Long id,
                                   @Param("active") Boolean active,
                                   Pageable pageable);

    @Query(value = "SELECT * FROM Product p " +
            "WHERE p.category_id IN(:ids) " +
            "AND (:active IS NULL OR p.active = :active)",
            nativeQuery = true)
    Page<Product> findByCategoryIdIn(@Param("ids") List<Long> ids,
                                     @Param("active") Boolean active,
                                     Pageable pageable);

    @Query(value = "SELECT * FROM Product p " +
            "WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "AND (:active IS NULL OR p.active = :active)",
           nativeQuery = true)
    Page<Product> findByNameContainingIgnoreCase(@Param("name") String name,
                                                 @Param("active") Boolean active,
                                                 Pageable pageable);

    @Query(value = "SELECT p.*, a.first_name, a.last_name " +
            "FROM product p " +
            "LEFT JOIN author a ON p.author_id = a.id " +
            "WHERE p.category_id IN(:ids) " +
            "AND (LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(a.first_name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(a.last_name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
            "AND (:active IS NULL OR p.active = :active)",
            nativeQuery = true)
    Page<Product> findByProductNameOrAuthorNameIncludeCategories(@Param("searchTerm") String searchTerm,
                                                             @Param("ids") List<Long> ids,
                                                             @Param("active") Boolean active,
                                                             Pageable pageable);

    @Query(value = "SELECT p.*, a.first_name, a.last_name " +
            "FROM product p " +
            "LEFT JOIN author a ON p.author_id = a.id " +
            "WHERE (LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(a.first_name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(a.last_name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
            "AND (:active IS NULL OR p.active = :active)",
            nativeQuery = true)
    Page<Product> findByProductNameOrAuthorName(@Param("searchTerm") String searchTerm,
                                                @Param("active") Boolean active,
                                                Pageable pageable);

    List<Product> findTop3ByActiveTrueOrderByDateCreatedDesc();

    @Query(value = "SELECT p.*, a.first_name, a.last_name " +
            "FROM product p " +
            "LEFT JOIN author a ON p.author_id = a.id " +
            "WHERE p.unit_price BETWEEN :startPrice AND :endPrice " +
            "AND (:active IS NULL OR p.active = :active)",
            nativeQuery = true )
    Page<Product> filterByPrice(@Param("startPrice") BigDecimal startPrice,
                                @Param("endPrice") BigDecimal endPrice,
                                @Param("active") Boolean active,
                                Pageable pageable);

    @Query(value = "SELECT p.*, a.first_name, a.last_name " +
            "FROM product p " +
            "LEFT JOIN author a ON p.author_id = a.id " +
            "WHERE p.category_id IN(:ids) " +
            "AND p.unit_price BETWEEN :startPrice AND :endPrice "+
            "AND (:active IS NULL OR p.active = :active)",
            nativeQuery = true )
    Page<Product> filterByPriceIncludeCategories(@Param("startPrice") BigDecimal startPrice,
                                                 @Param("endPrice") BigDecimal endPrice,
                                                 @Param("ids") List<Long> ids,
                                                 @Param("active") Boolean active,
                                                 Pageable pageable);

}
