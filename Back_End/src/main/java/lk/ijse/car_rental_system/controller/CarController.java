package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.CarDTO;
import lk.ijse.car_rental_system.service.CarService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/car")
public class CarController {
    @Autowired
    CarService carService;

    @PostMapping
    public ResponseUtil saveCar(CarDTO dto) {
        try {
            carService.saveCar(dto);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseUtil("Ok", "Successfully added...!", dto.getRegistration_number());
    }

    @DeleteMapping(params = {"registration_number"})
    public ResponseUtil deleteCar(String registration_number) {
        carService.deleteCar(registration_number);
        return new ResponseUtil("Ok", "Successfully deleted...!", registration_number);
    }

    @PutMapping(params = {"registration_number", "status"})
    public ResponseUtil updateCarStatus(String registration_number, String status) {
        carService.updateCarStatus(registration_number, status);
        return new ResponseUtil("Ok", "Successfully updated...!", registration_number);
    }

    @GetMapping
    public ResponseUtil getAllCars() {
        return new ResponseUtil("Ok", "Successfully loaded...!", carService.getAllCars());
    }

    @GetMapping(path = "/brands")
    public ResponseUtil getCarBrands() {
        return new ResponseUtil("Ok", "Successfully loaded...!", carService.getCarBrands());
    }

    @GetMapping(path = "/daily/rates")
    public ResponseUtil getCarDailyRates() {
        return new ResponseUtil("Ok", "Successfully loaded...!", carService.getCarDailyRates());
    }

    @GetMapping(path = "/monthly/rates")
    public ResponseUtil getCarMonthlyRates() {
        return new ResponseUtil("Ok", "Successfully loaded...!", carService.getCarMonthlyRates());
    }

    @GetMapping(path = "/count",params = {"status"})
    public ResponseUtil getAvailableCarCount(String status) {
        return new ResponseUtil("Ok", "Successfully loaded...!", carService.getAvailableCarCount(status));
    }

    @GetMapping(path = "/need/maintain/count")
    public ResponseUtil getNeedMaintenanceCarCount() {
        return new ResponseUtil("Ok", "Successfully loaded...!", carService.getNeedMaintenanceCarCount());
    }

    @GetMapping(params = {"registration_number"})
    public ResponseUtil searchCarByRegistrationNumber(String registration_number) {
        return new ResponseUtil("Ok", "", carService.searchCarByRegistrationNumber(registration_number));
    }
}
