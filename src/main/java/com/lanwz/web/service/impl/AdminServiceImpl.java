package com.lanwz.web.service.impl;

import com.lanwz.web.dao.AdminDao;
import com.lanwz.web.pojo.Admin;
import com.lanwz.web.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AdminServiceImpl implements AdminService {

    public static final Map<String,String> tokenMap=new HashMap<>();

    @Autowired
    private AdminDao adminDao;

    @Override
    public String login(Admin admin) {
        Admin admin1=adminDao.findByUsername(admin.getUsername());
        if(admin1 != null && (admin1.getPassword().equals(DigestUtils.md5DigestAsHex(admin.getPassword().getBytes())))){
            String token = UUID.randomUUID().toString();
            tokenMap.put(admin.getUsername(),token);
            return token;
        }
        return null;
    }
}
