package com.example.demo.serviceimpl;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
//import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dao.CategoryRepository;
import com.example.demo.dao.CommentRepository;
import com.example.demo.dao.PostRepository;
import com.example.demo.dao.UserDao;
import com.example.demo.dto.PostDto;
import com.example.demo.model.Category;
import com.example.demo.model.Comment;
import com.example.demo.model.Post;
import com.example.demo.model.User;
import com.example.demo.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
@Service
public class PostServiceImpl implements PostService {

    private static final Logger logger = LoggerFactory.getLogger(PostServiceImpl.class);


    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserDao userDao;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Override
   public Post savePost(Post post, MultipartFile file) throws IOException {
    post.setDate(new Date(System.currentTimeMillis()));
        
    if (!file.isEmpty()) {
        post.setFilePath(file.getBytes());
    }

     // Assuming you have the userId available to associate the post with a user
     User user = userDao.findById(post.getUser().getId())
     .orElseThrow(() -> new EntityNotFoundException("User not found"));
        post.setUser(user);

    Category category = categoryRepository.findById(post.getCategory().getId())
    .orElseThrow(() -> new EntityNotFoundException("Category not found"));
    post.setCategory(category);

return postRepository.save(post);
   }
   @Override
   public List<PostDto> getAllPost() {
       try {
           return postRepository.findAll().stream()
                   .map(this::convertToDto)
                   .collect(Collectors.toList());
       } catch (Exception e) {
           logger.error("Error fetching all posts", e);
           throw e;
       }
   }


    public PostDto getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                                  .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        return convertToDto(post);
    }

    public List<PostDto> getUserPosts(Long userId) {
        List<Post> userPosts = postRepository.findByUserId(userId);
        return userPosts.stream()
                        .map(this::convertToDto)
                        .collect(Collectors.toList());
    }
    
    @Override
    public List<PostDto> getPostsByCategory(Long categoryId) {
        List<Post> categoryPosts = postRepository.findByCategoryId(categoryId);
        return categoryPosts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private PostDto convertToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setName(post.getName());
        postDto.setContent(post.getContent());
        postDto.setDate(post.getDate());
        postDto.setFilePath(post.getFilePath());
        postDto.setUserId(post.getUser().getId());
        postDto.setCategoryId(post.getCategory().getId());
        postDto.setCategoryName(post.getCategory().getName());
        postDto.setUserName(post.getUser().getName());  // Add this line to set the user's name
        postDto.setUserEmail(post.getUser().getEmail());  // Add this line to set the user's name
        postDto.setUserNumber(post.getUser().getContactNumber());  // Add this line to set the user's name


        return postDto;
    }
    @Transactional
    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                                   .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        
        // Delete associated comments
        List<Comment> comments = commentRepository.findByPostId(postId);
        commentRepository.deleteAll(comments);
    
        // Now delete the post
        postRepository.delete(post);
    }
    @Override
    public Post updatePost(Long postId, String name, String content, MultipartFile file, Long categoryId) throws IOException {
        Post post = postRepository.findById(postId)
                                  .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        post.setName(name);
        post.setContent(content);

        if (!file.isEmpty()) {
            post.setFilePath(file.getBytes());
        }

        Category category = categoryRepository.findById(categoryId)
                                              .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        post.setCategory(category);

        return postRepository.save(post);
    }
}