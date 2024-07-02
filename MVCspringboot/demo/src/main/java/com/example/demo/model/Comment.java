package com.example.demo.model;

import java.util.Date;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "postId",nullable = false)
    @JsonBackReference // Add this annotation
    private Post post;
    
}