package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.UserRepository;
import com.example.springbootecommercebookstore.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        return userRepository.findByEmail(usernameOrEmail).orElseThrow(()-> new UsernameNotFoundException("User not found: "+usernameOrEmail));
    }
}
