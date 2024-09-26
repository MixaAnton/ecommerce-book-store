package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.dto.ChangePasswordRequest;
import com.example.springbootecommercebookstore.entity.User;
import com.example.springbootecommercebookstore.services.UserInfoService;
import com.example.springbootecommercebookstore.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping("/all")
    public ResponseEntity<Page<User>> getAllUsers(Pageable pageable){
        Page<User> users= service.getAllUSers(pageable);
        return ResponseEntity.ok(users);
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/change-status/{userId}")
    public ResponseEntity<String> changeUSerStatus(@PathVariable Long userId)
    {
        service.changeUserStatus(userId);
        return ResponseEntity.ok("Status successfully changed");
    }

}
