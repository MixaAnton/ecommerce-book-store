package com.example.springbootecommercebookstore.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoleEnum {

    MANAGER("MANAGER"),
    ADMIN("ADMIN"),
    USER("USER");

    private final String role;

}
