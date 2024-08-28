package com.example.springbootecommercebookstore.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "language")
@Getter
@Setter
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "designation",length = 3)
    private String designation;

   // @OneToMany(cascade = CascadeType.ALL, mappedBy = "language")
    //private Set<Product> products;
}
