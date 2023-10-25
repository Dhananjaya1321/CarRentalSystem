package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.CarDTO;
import lk.ijse.car_rental_system.service.CarService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/car")
public class CarController {
    @Autowired
    CarService carService;

    @PostMapping
    public ResponseUtil saveCar(CarDTO dto) {
        carService.saveCar(dto);
        return new ResponseUtil("Ok", "Successfully added...!", dto.getRegistration_number());
    }

    @DeleteMapping(params = {"registration_number"})
    public ResponseUtil deleteCar(String registration_number) {
        carService.deleteCar(registration_number);
        return new ResponseUtil("Ok", "Successfully deleted...!", registration_number);
    }

    @GetMapping
    public ResponseUtil getAllCars() {
        return new ResponseUtil("Ok", "Successfully loaded...!", carService.getAllCars());
    }

    @GetMapping(params = {"registration_number"})
    public ResponseUtil searchCarByRegistrationNumber(String registration_number){
        CarDTO carDTO = carService.searchCarByRegistrationNumber(registration_number);
        System.out.println("\n\n\n\n"+carDTO.toString());
        return new ResponseUtil("Ok","",carDTO);
    }
}
