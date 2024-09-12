package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.StatusRepository;
import com.example.springbootecommercebookstore.entity.Status;
import com.example.springbootecommercebookstore.services.interfaces.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public Status getStatusByName(String statusName) {
        return  statusRepository.findByName(statusName);
    }
}
