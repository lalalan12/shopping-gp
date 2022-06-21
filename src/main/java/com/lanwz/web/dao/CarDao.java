package com.lanwz.web.dao;

import com.lanwz.web.pojo.Car;

import java.util.*;

public interface CarDao {
    List<Car> getCar(String username);
    Car byPidCar(String username,Integer pid);
    int saveCar(Car car);
    int updateCar(Car car);
    int deleteCar(Car car);
}
