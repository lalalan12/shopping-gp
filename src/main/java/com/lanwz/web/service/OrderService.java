package com.lanwz.web.service;


import com.lanwz.web.pojo.Order;

import java.util.*;

public interface OrderService {
    int saveOrder(Order order);
    List<Order> getOrder(String username);
    int deleteOrder(Order order);
    List<Order> allOrder();
    int orderState(Order order);
}
