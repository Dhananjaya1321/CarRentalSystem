package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.service.DriverService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/driver")
public class DriverController {
    @Autowired
    DriverService driverService;
    @GetMapping
    public ResponseUtil getAllDrivers(){
        return new ResponseUtil("Ok","",driverService.getAllDrivers());
    }
}
