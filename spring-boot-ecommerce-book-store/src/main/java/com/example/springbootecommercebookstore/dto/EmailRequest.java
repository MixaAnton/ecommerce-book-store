package com.example.springbootecommercebookstore.dto;

import lombok.Data;

@Data
public class EmailRequest {

    private String name;
    private String email;
    private String subject;
    private String message;
}
