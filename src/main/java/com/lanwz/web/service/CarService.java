package com.lanwz.web.service;

import com.lanwz.web.pojo.Car;
import java.util.*;

public interface CarService {
    List<Car> getCar(String username);
    int saveCar(Car car);
    int deleteCar(Car car);
    int updateCar(Car car);
}
