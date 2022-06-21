package com.lanwz.web.controller;
import com.lanwz.web.pojo.User;
import com.lanwz.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;


@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

//    用户登录
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return userService.login(user);
    }

//    验证用户名唯一性
    @GetMapping("/get/{username}")
    public int saveUser(@PathVariable("username") String username) {
        return userService.saveByUsername(username);
    }

//    注册存储用户信息
    @PostMapping("/register")
    public int register(@RequestBody User user){
        return userService.userSave(user);
    }

//    用户信息
    @PostMapping("/userMessage")
    public User userMessage(@RequestBody User user) {return userService.userMessage(user.getUsername());}

//    修改用户信息
    @PostMapping("/userChange")
    public int userChange(@RequestBody User user){
    return userService.userChange(user);
}

    @PostMapping("/allUser")
    public List<User> allUser(){
        return userService.allUser();
    }

    @PostMapping("/deleteUser")
    public int deleteUser(@RequestBody User user){
        return userService.deleteUser(user);
    }

    @GetMapping("/findByUsername/{username}")
    public User findByUsername(@PathVariable("username") String username){
        return userService.findByUsername(username);
    }

}

