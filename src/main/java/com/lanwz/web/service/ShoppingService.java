package com.lanwz.web.service;

import com.lanwz.web.pojo.Shopping;
import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

public interface ShoppingService {

    List<Shopping> getShopping(Integer tid);

    List<Shopping> searchShopping(String search);

    List<Shopping> allShopping();

    int updateShopping(Integer pid,Integer num);

    int deleteShopping(Integer pid);

    int updateShoppingAdmin(Shopping shopping);

    int addShopping(Shopping shopping);

    public String save(MultipartFile file, Shopping shopping, ModelMap map) throws IOException;


}
