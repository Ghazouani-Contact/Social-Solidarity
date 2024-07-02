package com.example.demo.restimpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.constents.CafeConstants;
import com.example.demo.controller.UserRest;
import com.example.demo.service.UserService;
import com.example.demo.utils.CafeUtils;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class UserRestImpl implements UserRest{

    @Autowired
    UserService userService;
@PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // Extract token or session ID from request
        String token = extractTokenFromRequest(request);
        
        // Invalidate the token or session
        userService.logout(token);

        return ResponseEntity.ok("Logged out successfully");
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
     // Logic to extract token from request headers or cookies
     // For example, if the token is present in the Authorization header:
     String authorizationHeader = request.getHeader("Authorization");
     if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
         return authorizationHeader.substring(7); // Extract token after "Bearer "
     }
     return null; // Return null if token is not found
 }
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
       try {
            return userService.signUp(requestMap);
       } catch (Exception ex) {
            ex.printStackTrace();
       }
      return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  @Override
public ResponseEntity<String> login(Map<String, String> requestMap) {
     try {
          return userService.login(requestMap);
     } catch (Exception e) {
          e.printStackTrace();
     }
return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
}  



}