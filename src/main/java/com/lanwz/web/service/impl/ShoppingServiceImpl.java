package com.lanwz.web.service.impl;

import com.lanwz.web.WebApplication;
import com.lanwz.web.dao.ShoppingDao;
import com.lanwz.web.pojo.Shopping;
import com.lanwz.web.service.ShoppingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;


@Service
public class ShoppingServiceImpl implements ShoppingService {

    @Autowired
    private ShoppingDao shoppingDao;
    private WebApplication webApplication;

    @Override
    public List<Shopping> getShopping(Integer tid) {
        return shoppingDao.getShopping(tid);
    }

    @Override
    public List<Shopping> searchShopping(String search) {
        return shoppingDao.searchShopping(search);
    }

    @Override
    public List<Shopping> allShopping() {
        return shoppingDao.allShopping();
    }

    @Override
    public int updateShopping(Integer pid, Integer num) {
        return shoppingDao.updateShopping(pid,num);
    }

    @Override
    public int deleteShopping(Integer pid) {
        return shoppingDao.deleteShopping(pid);
    }

    @Override
    public int updateShoppingAdmin(Shopping shopping) {
        return shoppingDao.updateShoppingAdmin(shopping);
    }

    @Override
    public int addShopping(Shopping shopping) {
        return shoppingDao.addShopping(shopping);
    }

    @Override
    @Transactional
    public String save(MultipartFile file, Shopping shopping, ModelMap map) throws IOException {

        // 保存图片的路径，图片上传成功后，将路径保存到数据库
        String filePath = "D:\\毕设\\代码\\web\\src\\main\\resources\\static\\image\\shopping";
        // 获取原始图片的扩展名
        String originalFilename = file.getOriginalFilename();
        // 生成文件新的名字
        String newFileName = UUID.randomUUID() + originalFilename;
        // 封装上传文件位置的全路径
        File targetFile = new File(filePath, newFileName);
        file.transferTo(targetFile);

        // 保存到数据库
        shopping.setImage(newFileName);
        shoppingDao.addShopping(shopping);
        return "redirect:/listImages";
    }
}
