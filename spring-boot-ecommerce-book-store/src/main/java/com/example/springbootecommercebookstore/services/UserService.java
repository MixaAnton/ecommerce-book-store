package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.UserRepository;
import com.example.springbootecommercebookstore.dto.ChangePasswordRequest;
import com.example.springbootecommercebookstore.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        repository.save(user);
    }

    public Page<User> getAllUSers(Pageable pageable) {

        return repository.findAll(pageable);
    }

    public void changeUserStatus(Long userId){
        User user = repository.findById(userId).orElseThrow(()->new UsernameNotFoundException("User with ${userId} not found!"));
        user.setActive(!user.isActive());
        repository.save(user);
    }
}
