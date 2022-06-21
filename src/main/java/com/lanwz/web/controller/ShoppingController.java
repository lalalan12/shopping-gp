package com.lanwz.web.controller;
import com.lanwz.web.pojo.Shopping;
import com.lanwz.web.service.ShoppingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;


@RestController
@RequestMapping("/api/shopping")

@CrossOrigin
public class ShoppingController {

    @Autowired
    ShoppingService shoppingService;

    @GetMapping("/getShopping/{tid}")
    public List<Shopping> getShopping(@PathVariable Integer tid){
        return shoppingService.getShopping(tid);
    }

    @GetMapping("/searchShopping/{search}")
    public List<Shopping> searchShopping(@PathVariable("search") String search){
        return shoppingService.searchShopping(search);
    }

    @PostMapping("/allShopping")
    public List<Shopping> allShopping(){
        return shoppingService.allShopping();
    }

    @PostMapping("/updateShopping")
    public int updateShopping(@RequestBody Shopping shopping){
        return shoppingService.updateShopping(shopping.getPid(),shopping.getNum());
    }

    @PostMapping("/deleteShopping")
    public int deleteShopping(@RequestBody Shopping shopping){
        return shoppingService.deleteShopping(shopping.getPid());
    }

    @PostMapping("/updateShoppingAdmin")
    public int updateShoppingAdmin(@RequestBody Shopping shopping){
        return shoppingService.updateShoppingAdmin(shopping);
    }

    @PostMapping("/addShopping")
    public int addShopping(@RequestBody Shopping shopping){
        return shoppingService.addShopping(shopping);
    }


    @RequestMapping(value = "/uploadFile")
    public String fileUpload( MultipartFile file) throws IOException {

        /**
         * 上传图片
         */
        //图片上传成功后，将图片的地址写到数据库
        String filePath = "D:/毕设/代码/web/src/main/resources/static/image/shopping";//保存图片的路径,tomcat中有配置
        //获取原始图片的拓展名
        String originalFilename = file.getOriginalFilename();
        String last=originalFilename.substring(originalFilename.lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString().replace("-","")+last;
        File targetFile = new File(filePath, newFileName);
        file.transferTo(targetFile);
        return "http://localhost:85/image/shopping/" + newFileName;
    }

}

