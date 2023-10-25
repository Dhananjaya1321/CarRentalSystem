package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.CarDTO;

import java.util.List;

public interface CarService{
    void saveCar(CarDTO dto);

    List<CarDTO> getAllCars();

    void deleteCar(String registration_number);
}
