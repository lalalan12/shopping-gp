package com.lanwz.web.service.impl;

import com.lanwz.web.dao.OrderDao;
import com.lanwz.web.pojo.Order;
import com.lanwz.web.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;

    @Override
    public int saveOrder(Order order) {
        return orderDao.saveOrder(order);
    }

    @Override
    public List<Order> getOrder(String username) {
        return orderDao.getOrder(username);
    }

    @Override
    public int deleteOrder(Order order) {
        return orderDao.deleteOrder(order);
    }

    @Override
    public List<Order> allOrder() {
        return orderDao.allOrder();
    }

    @Override
    public int orderState(Order order) {
        return orderDao.orderState(order);
    }

}
