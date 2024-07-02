package com.example.demo.model;

//import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.OneToMany;
import java.util.Set;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

  /*  @OneToMany(mappedBy = "category")
    private List<Post> posts;*/
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Post> posts;
}
