package com.lanwz.web;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
//找到该包的接口，为他们通过xml生成接口的对象
@MapperScan("com.lanwz.web.dao")
public class WebApplication{


    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class, args);
    }

}
