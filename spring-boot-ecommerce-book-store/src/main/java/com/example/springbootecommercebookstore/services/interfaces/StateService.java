package com.example.springbootecommercebookstore.services.interfaces;

import com.example.springbootecommercebookstore.entity.State;

import java.util.List;

public interface StateService {

    List<State> getAllByCountryCode(String code);
}
