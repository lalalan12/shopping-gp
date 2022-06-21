package com.lanwz.web.controller;

import com.lanwz.web.pojo.Admin;
import com.lanwz.web.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")

@CrossOrigin
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping("/login")
    public String login(@RequestBody Admin admin){
        return adminService.login(admin);
    }
}
