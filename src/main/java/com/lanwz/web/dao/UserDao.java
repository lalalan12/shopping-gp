package com.lanwz.web.dao;
import com.lanwz.web.pojo.User;
import java.util.*;

public interface UserDao {
    //查询用户
    User findByUsername(String username);
    /*新增用户*/
    int userSave(User user);
//    修改用户信息
    int userChange(User user);

    List<User> allUser();

    int deleteUser(User user);


}
