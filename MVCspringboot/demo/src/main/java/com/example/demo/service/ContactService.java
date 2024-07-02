package com.example.demo.service;

import com.example.demo.model.Contact;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface ContactService {
    ResponseEntity<Map<String, String>> saveContact(Contact contact);
}
