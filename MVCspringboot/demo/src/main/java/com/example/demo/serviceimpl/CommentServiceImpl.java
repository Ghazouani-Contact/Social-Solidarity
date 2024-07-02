package com.example.demo.serviceimpl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.CommentRepository;
import com.example.demo.dao.PostRepository;
import com.example.demo.model.Comment;
import com.example.demo.model.Post;
import com.example.demo.service.CommentService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CommentServiceImpl implements CommentService{
    
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;

    public Comment createComment(Long postId, String content){
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Comment comment = new Comment();
            
            comment.setPost(optionalPost.get());
            comment.setContent(content);
            comment.setCreatedAt(new Date());
            return commentRepository.save(comment);
        }
        throw new EntityNotFoundException("Post Not Found");
        
    }

	@Override
	public List<Comment> getCommentsByPostId(Long postId) {
		return commentRepository.findByPostId(postId);
	}

    @Override
    public void deleteComment(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isPresent()) {
            commentRepository.delete(optionalComment.get());
        } else {
            throw new EntityNotFoundException("Comment Not Found");
        }
    }
}