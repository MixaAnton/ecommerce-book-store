package com.example.springbootecommercebookstore.services;

import com.example.springbootecommercebookstore.dao.RoleRepository;
import com.example.springbootecommercebookstore.dao.UserRepository;
import com.example.springbootecommercebookstore.dto.ChangePasswordRequest;
import com.example.springbootecommercebookstore.dto.UserUpdate;
import com.example.springbootecommercebookstore.entity.Language;
import com.example.springbootecommercebookstore.entity.Product;
import com.example.springbootecommercebookstore.entity.Role;
import com.example.springbootecommercebookstore.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    private final RoleRepository roleRepository;

    public User getUser(Long userId){
        return repository.findById(userId).orElseThrow(()->new UsernameNotFoundException("User not found"));
    }

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }

        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

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

    public List<Role> getAllRoles(){

        return roleRepository.findAll();
    }

    public User editUser(UserUpdate userUpdate,Principal connectedUser){

        var existingUser = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        
        if(!Objects.equals(userUpdate.getEmail(), existingUser.getEmail()))
            existingUser.setEmail(userUpdate.getEmail());
        if(!Objects.equals(userUpdate.getFirstName(), existingUser.getFirstName()))
            existingUser.setFirstName(userUpdate.getFirstName());
        if(!Objects.equals(userUpdate.getLastName(), existingUser.getLastName()))
            existingUser.setLastName(userUpdate.getLastName());
        if(!Objects.equals(userUpdate.getUsername(), existingUser.getUserName()))
            existingUser.setUserName(userUpdate.getUsername());

        return repository.save(existingUser);
    }

    public User changeUserRole(Long userId,Long roleId){
        User existingUser = repository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + userId));
        Role role = roleRepository.findById(roleId).orElseThrow();

        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role);

        existingUser.setRoles(roleSet);

        return repository.save(existingUser);
    }
}
