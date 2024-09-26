package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.RoleRepository;
import com.example.springbootecommercebookstore.dao.UserRepository;
import com.example.springbootecommercebookstore.dto.AuthenticationRequest;
import com.example.springbootecommercebookstore.dto.AuthenticationResponse;
import com.example.springbootecommercebookstore.dto.RegisterRequest;
import com.example.springbootecommercebookstore.entity.Role;
import com.example.springbootecommercebookstore.entity.User;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        Role role = roleRepository.findByName("USER").orElseThrow();
        Set<Role> roles = new HashSet<>();
        roles.add(role);

        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .username(request.getUserName())
                .active(true)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .roles(roles)
                .build();

        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        //var refreshToken = jwtService.generateRefreshToken(user);
        //saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                //.accessToken(jwtToken)
                //.refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws UserPrincipalNotFoundException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        if(!user.isActive())
            throw new UserPrincipalNotFoundException("User account is not active");
        var jwtToken = jwtService.generateToken(user);
        //var refreshToken = jwtService.generateRefreshToken(user);
        //revokeAllUserTokens(user);
        //saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                //.accessToken(jwtToken)
                //.refreshToken(refreshToken)
                .token(jwtToken)
                .build();
    }
}
