package com.lanwz.web.service;

import com.lanwz.web.pojo.User;
import java.util.*;

public interface UserService {

//    用户登录
    String login(User user);

//    用户名唯一
    int saveByUsername(String username);

//    用户注册
    int userSave(User user);

//    用户信息
    User userMessage(String username);

//    修改用户信息
    int userChange(User user);

    List<User> allUser();

    int deleteUser(User user);

    User findByUsername(String username);

}
