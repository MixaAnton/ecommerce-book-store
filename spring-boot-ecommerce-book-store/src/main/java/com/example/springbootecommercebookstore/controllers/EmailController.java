package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.dto.EmailRequest;
import com.example.springbootecommercebookstore.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {

        emailService.sendEmail(emailRequest.getName(),emailRequest.getEmail(),emailRequest.getSubject(),emailRequest.getMessage());

        return ResponseEntity.ok("Email sent successfully");
    }
}
