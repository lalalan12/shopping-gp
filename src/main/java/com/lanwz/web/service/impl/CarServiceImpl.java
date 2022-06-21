package com.lanwz.web.service.impl;

import com.lanwz.web.dao.CarDao;
import com.lanwz.web.pojo.Car;
import com.lanwz.web.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarDao carDao;

    @Override
    public List<Car> getCar(String username) {
        return carDao.getCar(username);
    }

    @Override
    public int saveCar(Car car) {
        Car car1 = carDao.byPidCar(car.getUsername(),car.getPid());
        Car car2 = car;
        if(car1 != null) {
            car2.setNum(car1.getNum()+car2.getNum());
            car2.setAllprice(car2.getPrice()*car2.getNum());
            return carDao.updateCar(car2);
        } else {
            return carDao.saveCar(car2);
        }
    }

    @Override
    public int deleteCar(Car car) {
        return carDao.deleteCar(car);
    }

    @Override
    public int updateCar(Car car) {
        return carDao.updateCar(car);
    }

}
