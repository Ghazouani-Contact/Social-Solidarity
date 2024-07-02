package com.example.demo.serviceimpl;

import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.example.demo.JWT.CustomerUsersDetailsService;
import com.example.demo.JWT.JwtUtil;
import com.example.demo.constents.CafeConstants;
import com.example.demo.dao.UserDao;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.utils.CafeUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomerUsersDetailsService customerUsersDetailsService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signup {}", requestMap);
        try {
            if (validateSignupMap(requestMap)) {
                User user = userDao.findByEmailId(requestMap.get("email"));
                if (Objects.isNull(user)) {
                    userDao.save(getUserFromMap(requestMap));
                    return CafeUtils.getResponseEntity("Successfully Registered", HttpStatus.OK);
                } else {
                    return CafeUtils.getResponseEntity("Email already exists.", HttpStatus.BAD_REQUEST);
                }
            } else {
                log.error("Invalid data in signup request: {}", requestMap);
                return CafeUtils.getResponseEntity(CafeConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            log.error("Exception during signup", ex);
            return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Boolean validateSignupMap(Map<String, String> requestMap) {
        return requestMap.containsKey("name") &&
               requestMap.containsKey("contactNumber") &&
               requestMap.containsKey("email") &&
               requestMap.containsKey("password") &&
               requestMap.containsKey("status") &&
               requestMap.containsKey("role");
    }

    private User getUserFromMap(Map<String, String> requestMap) {
        User user = new User();
        user.setName(requestMap.get("name"));
        user.setContactNumber(requestMap.get("contactNumber"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(passwordEncoder.encode(requestMap.get("password")));
        user.setStatus(requestMap.getOrDefault("status", "true")); // Default to "true"
        user.setRole(requestMap.getOrDefault("role", "user"));     // Default to "user"
        return user;
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside login");
        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password"))
            );

            if (auth.isAuthenticated()) {
                // Load user details again to ensure we have the latest status
                User userDetails = customerUsersDetailsService.getUserDetail();
                if ("true".equalsIgnoreCase(userDetails.getStatus())) {
                    String token = jwtUtil.generateToken(
                        userDetails.getEmail(),
                        userDetails.getRole()
                    );
                    String userJson = new ObjectMapper().writeValueAsString(userDetails);

                    String responseJson = "{\"token\":\"" + token + "\", \"user\":" + userJson + "}";
                    return new ResponseEntity<>(responseJson, HttpStatus.OK);
                   // return new ResponseEntity<>("{\"token\":\"" + token + "\"}", HttpStatus.OK);

                } else {
                    return CafeUtils.getResponseEntity("User is not active", HttpStatus.BAD_REQUEST);
                }
            } else {
                return CafeUtils.getResponseEntity("Invalid email or password", HttpStatus.BAD_REQUEST);
            }
        } catch (AuthenticationException e) {
            log.error("Authentication failed", e);
            return CafeUtils.getResponseEntity("Invalid email or password", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Exception in login", e);
            return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void logout(String token) {
        // Logic to invalidate token or session
        // For JWT, you may maintain a blacklist of revoked tokens
        // For session-based authentication, invalidate the session
    }
    
}
