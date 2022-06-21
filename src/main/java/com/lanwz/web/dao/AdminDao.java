package com.lanwz.web.dao;

import com.lanwz.web.pojo.Admin;

public interface AdminDao {

    Admin findByUsername(String username);

}
