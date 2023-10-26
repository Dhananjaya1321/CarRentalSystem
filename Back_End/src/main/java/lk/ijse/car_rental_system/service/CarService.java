package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.CarDTO;

import java.io.IOException;
import java.util.List;

public interface CarService{
    void saveCar(CarDTO dto) throws IOException;

    List<CarDTO> getAllCars();

    void updateCarStatus(String registration_number, String status);

    void deleteCar(String registration_number);

    List<CarDTO> searchCarByRegistrationNumber(String registration_number);
}
