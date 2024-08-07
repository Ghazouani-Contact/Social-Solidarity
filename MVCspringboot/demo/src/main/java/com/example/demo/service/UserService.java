package com.example.demo.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;


public interface UserService {
    ResponseEntity<String> signUp(Map<String, String> requestMap);
    ResponseEntity<String> login(Map<String, String> requestMap); 
    void logout(String token);

}