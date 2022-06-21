package com.lanwz.web.dao;

import com.lanwz.web.pojo.Shopping;

import java.util.*;

public interface ShoppingDao {

    List<Shopping> getShopping(Integer tid);
    List<Shopping> searchShopping(String search);
    List<Shopping> allShopping();
    int updateShopping(Integer pid,Integer num);
    int deleteShopping(Integer pid);
    int updateShoppingAdmin(Shopping shopping);
    int addShopping(Shopping shopping);
}
