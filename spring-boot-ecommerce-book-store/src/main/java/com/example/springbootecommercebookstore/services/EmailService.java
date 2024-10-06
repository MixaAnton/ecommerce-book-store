package com.example.springbootecommercebookstore.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${email.to.address}")
    private String toEmail;

    public void sendEmail(String name,String fromOrTo,String subject, String body) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromOrTo);
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText("Message from: " +name+ " (" + fromOrTo + ")\n\n" + body);

        mailSender.send(message);
    }
}
