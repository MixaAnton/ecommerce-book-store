package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.entity.Status;

public interface StatusService {
    Status getStatusByName(String statusName);
}
