package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.dto.AuthenticationRequest;
import com.example.springbootecommercebookstore.dto.AuthenticationResponse;
import com.example.springbootecommercebookstore.dto.RegisterRequest;
import com.example.springbootecommercebookstore.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) throws UserPrincipalNotFoundException {

        return ResponseEntity.ok(service.authenticate(request));
    }
}
