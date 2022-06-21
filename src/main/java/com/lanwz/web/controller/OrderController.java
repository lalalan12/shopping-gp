package com.lanwz.web.controller;

import com.lanwz.web.pojo.Order;
import com.lanwz.web.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/order")

@CrossOrigin
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/saveOrder")
    public int saveOrder(@RequestBody Order order){
        return orderService.saveOrder(order);
    }

    @GetMapping("/getOrder/{username}")
    public List<Order> getOrder(@PathVariable("username") String username){
        return orderService.getOrder(username);
    }

    @PostMapping("/deleteOrder")
    public int deleteOrder(@RequestBody Order order){
        return orderService.deleteOrder(order);
    }

    @PostMapping("/allOrder")
    public List<Order> allOrder(){
        return orderService.allOrder();
    }

    @PostMapping("/orderState")
    public int orderState(@RequestBody Order order){
        return orderService.orderState(order);
    }

}
