package com.example.springbootecommercebookstore.dto;

import lombok.Data;

@Data
public class UserUpdate {

    private String username;
    private String email;
    private String firstName;
    private String  lastName;
}