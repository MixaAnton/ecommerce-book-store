package com.example.springbootecommercebookstore.dto;

import com.example.springbootecommercebookstore.entity.ProductCategory;

import jakarta.persistence.Column;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


import java.math.BigDecimal;


@Data
public class ProductCreate {

    private Long categoryId;

    private int authorId;

    private int languageId;

    private String name;

    private String description;

    private BigDecimal unitPrice;

    private String image;

    private String imageExtension;

    private int unitsInStock;

    private int numOfPages;

    private int yearOfPublication;

}
