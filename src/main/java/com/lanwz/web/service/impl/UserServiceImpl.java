package com.lanwz.web.service.impl;

import com.lanwz.web.dao.UserDao;
import com.lanwz.web.pojo.User;
import com.lanwz.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    public static final Map<String,String> tokenMap=new HashMap<>();

    @Autowired
    private UserDao userDao;


    @Override
    public String login(User user) {
        User user1=userDao.findByUsername(user.getUsername());
        if(user1 != null && (user1.getPassword().equals(DigestUtils.md5DigestAsHex(user.getPassword().getBytes())))){
            String token= UUID.randomUUID().toString();
            tokenMap.put(user.getUsername(),token);
            return token;
        }
        return null;
    }

    @Override
    public int saveByUsername(String username) {
        User user=userDao.findByUsername(username);
        return user == null ? 0: 1;
    }


    @Override
    public int userSave(User user) {
        user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));
        return userDao.userSave(user);
    }

    @Override
    public User userMessage(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public int userChange(User user) {
        return userDao.userChange(user);
    }

    @Override
    public List<User> allUser() {
        return userDao.allUser();
    }

    @Override
    public int deleteUser(User user) {
        return userDao.deleteUser(user);
    }

    @Override
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }
}
