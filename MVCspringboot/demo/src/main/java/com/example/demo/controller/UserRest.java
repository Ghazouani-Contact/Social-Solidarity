package com.example.demo.controller;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;

@RequestMapping(path="/user")
public interface UserRest {
    
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request);
    
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping(path="/signup")

    public ResponseEntity<String> signUp(@RequestBody(required = true) Map<String, String> requestMap);

    @CrossOrigin(origins = "http://localhost:4200")
     @PostMapping(path="/login")

    public ResponseEntity<String> login(@RequestBody(required = true) Map<String, String> requestMap);  


    
}