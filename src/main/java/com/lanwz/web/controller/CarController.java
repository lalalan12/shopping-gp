package com.lanwz.web.controller;

import com.lanwz.web.pojo.Car;
import com.lanwz.web.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/api/car")

@CrossOrigin
public class CarController {

    @Autowired
    CarService carService;

    @PostMapping("/getCar")
    public List<Car> getShopping(@RequestBody Car car){
        return carService.getCar(car.getUsername());
    }

    @PostMapping("/saveCar")
    public int saveCar(@RequestBody Car car){
        return carService.saveCar(car);
    }

    @PostMapping("/deleteCar")
    public int deleteCar(@RequestBody Car car){
        return carService.deleteCar(car);
    }

    @PostMapping("/updateCar")
    public int updateCar(@RequestBody Car car){
        return carService.updateCar(car);
    }


}

