package com.example.demo.controller;

import com.example.demo.model.Contact;
import com.example.demo.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> handleContact(@RequestBody Contact contact) {
        return contactService.saveContact(contact);
    }
}
