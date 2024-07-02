package com.example.demo.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
 
import com.example.demo.dto.PostDto;
import com.example.demo.model.Post;


public interface PostService { 
     
     Post savePost(Post post, MultipartFile file) throws IOException;
     List<PostDto> getAllPost();
     PostDto getPostById(Long postId);
     List<PostDto> getUserPosts(Long userId);
     List<PostDto> getPostsByCategory(Long categoryId);
     void deletePost(Long postId);
     Post updatePost(Long postId, String name, String content, MultipartFile file, Long categoryId) throws IOException;


}