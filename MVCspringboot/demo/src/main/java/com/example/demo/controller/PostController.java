package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dao.UserDao;
import com.example.demo.dto.PostDto;
import com.example.demo.model.Category;
import com.example.demo.model.Post;
import com.example.demo.model.User;
import com.example.demo.service.CategoryService;
import com.example.demo.service.PostService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/posts")

public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private UserDao userDao;
    @Autowired
    private CategoryService categoryService;

    
    @PostMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> createPost(
            @RequestParam("name") String name,
            @RequestParam("content") String content,
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Integer userId,
            @RequestParam("categoryId") Long categoryId
          ) {
        try {
            Post post = new Post();
            post.setName(name);
            post.setContent(content);

            // Set user
            User user = userDao.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
            post.setUser(user);

           // Set category
            Category category = categoryService.findById(categoryId)
                    .orElseThrow(() -> new EntityNotFoundException("Category not found"));
            post.setCategory(category);

            Post createdPost = postService.savePost(post, file);
            PostDto postDto = postService.getPostById(createdPost.getId());

            return ResponseEntity.status(HttpStatus.CREATED).body(postDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts() {
        try {
         //   List<Post> posts = postService.getAllPost();

            return ResponseEntity.status(HttpStatus.OK).body(postService.getAllPost());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable Long postId) {
        try {
           // Post post = postService.getPostById(postId);
           PostDto post = postService.getPostById(postId);

            return ResponseEntity.ok(post);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/users/{userId}")
public ResponseEntity<List<PostDto>> getUserPosts(@PathVariable Long userId) {
    try {
        List<PostDto> userPosts = postService.getUserPosts(userId);
        return ResponseEntity.ok(userPosts);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
 @GetMapping("/categories/{categoryName}")
    public ResponseEntity<List<PostDto>> getPostsByCategory(@PathVariable String categoryName) {
        try {
            Category category = categoryService.findByName(categoryName)
                    .orElseThrow(() -> new EntityNotFoundException("Category not found"));
            List<PostDto> categoryPosts = postService.getPostsByCategory(category.getId());
            return ResponseEntity.ok(categoryPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
        @DeleteMapping("/{postId}")
        @CrossOrigin(origins = "http://localhost:4200")
        public ResponseEntity<?> deletePost(@PathVariable Long postId) {
            try {
                postService.deletePost(postId);
                return ResponseEntity.ok().build();
            } catch (EntityNotFoundException e) {
                return ResponseEntity.notFound().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
   @PutMapping("/{postId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> updatePost(
            @PathVariable Long postId,
            @RequestParam("name") String name,
            @RequestParam("content") String content,
            @RequestParam("file") MultipartFile file,
            @RequestParam("categoryId") Long categoryId) {
        try {
            Post updatedPost = postService.updatePost(postId, name, content, file, categoryId);
            PostDto postDto = postService.getPostById(updatedPost.getId());
            return ResponseEntity.ok(postDto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}