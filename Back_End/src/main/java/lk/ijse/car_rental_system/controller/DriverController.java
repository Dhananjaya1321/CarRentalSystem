package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.service.DriverService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/driver")
public class DriverController {
    @Autowired
    DriverService driverService;
    @PostMapping
    public ResponseUtil addDriver(@RequestBody DriverDTO dto){
        System.out.println(dto.toString());
        driverService.saveDriver(dto);
        return new ResponseUtil("Ok","",dto);
    }
    @GetMapping
    public ResponseUtil getAllDrivers(){
        return new ResponseUtil("Ok","",driverService.getAllDrivers());
    }
}
