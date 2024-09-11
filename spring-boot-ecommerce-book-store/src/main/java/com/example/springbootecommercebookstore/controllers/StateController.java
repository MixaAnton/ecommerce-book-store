package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.entity.State;
import com.example.springbootecommercebookstore.services.StateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/states")
public class StateController {

    @Autowired
    StateServiceImpl stateService;

    @GetMapping("/by-country-code")
    public List<State> getAllStatesByCountryCode(@RequestParam String code){
        return stateService.getAllByCountryCode(code);
    }
}
