package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.CarDTO;
import lk.ijse.car_rental_system.service.CarService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/car")
public class CarController {
    @Autowired
    CarService carService;

    @PostMapping
    public ResponseUtil saveCar(CarDTO dto){
        carService.saveCar(dto);
        return new ResponseUtil("Ok","Successfully added...!",dto.getRegistration_number());
    }
}
