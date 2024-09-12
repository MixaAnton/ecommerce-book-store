package com.example.springbootecommercebookstore.enums;

public enum StatusEnum {

    CREATED("Created"),
    APPROVED("Approved"),
    REJECTED("Rejected");

    private String displayName;

    StatusEnum(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
