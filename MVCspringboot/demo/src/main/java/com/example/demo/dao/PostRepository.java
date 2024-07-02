package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserId(Long userId);
    List<Post> findByCategoryId(Long categoryId); 

    
}