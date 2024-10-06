package com.example.springbootecommercebookstore.controllers;

import com.example.springbootecommercebookstore.dto.ChangePasswordRequest;
import com.example.springbootecommercebookstore.dto.UserUpdate;
import com.example.springbootecommercebookstore.entity.Role;
import com.example.springbootecommercebookstore.entity.User;
import com.example.springbootecommercebookstore.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping("/single/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId)
    {
        return ResponseEntity.ok(service.getUser(userId));
    }

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

    @GetMapping("/roles")
    public List<Role> getAllRoles(){
      return service.getAllRoles();
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(
            @RequestBody UserUpdate userUpdate,Principal connectedUser) {
        User updatedUser = service.editUser(userUpdate,connectedUser);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/changeRole/{userId}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long userId,
            @RequestParam Long roleId) {
        User updatedUser = service.changeUserRole(userId, roleId);
        return ResponseEntity.ok(updatedUser);
    }

}
