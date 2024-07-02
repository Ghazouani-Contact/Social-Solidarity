package com.example.demo.serviceimpl;

import com.example.demo.dao.ContactRepository;
import com.example.demo.model.Contact;
import com.example.demo.service.ContactService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

   @Override
    public ResponseEntity<Map<String, String>> saveContact(Contact contact) {
        Map<String, String> response = new HashMap<>();
        try {
            contactRepository.save(contact);
            response.put("message", "Contact request submitted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("message", "Failed to submit contact request");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
