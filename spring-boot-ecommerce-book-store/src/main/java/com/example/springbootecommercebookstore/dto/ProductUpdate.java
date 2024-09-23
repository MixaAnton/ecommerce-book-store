package com.example.springbootecommercebookstore.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Getter
@Setter
public class ProductUpdate {

    private int languageId;

    private String description;

    private BigDecimal unitPrice;

    private String image;

    private String imageExtension;

    private int unitsInStock;

    private int numOfPages;

    private int yearOfPublication;
}
