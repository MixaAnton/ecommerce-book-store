package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.StateRepository;
import com.example.springbootecommercebookstore.entity.State;
import com.example.springbootecommercebookstore.services.interfaces.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateServiceImpl implements StateService {

    @Autowired
    StateRepository stateRepository;

    @Override
    public List<State> getAllByCountryCode(String code) {
        return stateRepository.findByCountryCode(code);
    }
}
