package com.example.demo.JWT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.dao.UserDao;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;

@Slf4j
@Service
public class CustomerUsersDetailsService implements UserDetailsService{

    @Autowired
    UserDao userDao;

    private com.example.demo.model.User userDetail;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Inside loadByUsername {}", username);
        userDetail = userDao.findByEmailId(username);
        if (userDetail != null) {
            return new User(userDetail.getEmail(), userDetail.getPassword(), new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
 
    public com.example.demo.model.User getUserDetail(){
        /* com.example.demo.model.User user = userDetail;
        user.setPassword(null); */
        return userDetail;
    }
}
