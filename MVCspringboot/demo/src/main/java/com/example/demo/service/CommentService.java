package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Comment;


public interface CommentService {
    Comment createComment(Long postId,String content);
    List<Comment> getCommentsByPostId(Long postId);
    void deleteComment(Long commentId);

}