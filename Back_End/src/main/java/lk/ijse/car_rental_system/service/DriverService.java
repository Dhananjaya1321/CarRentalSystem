package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.dto.UserDTO;

import java.util.List;

public interface DriverService {
    List<DriverDTO> getAllDrivers();

    void saveDriver(DriverDTO dto);

    void deleteDriver(String driver_id);

    DriverDTO findDriverByNic(String nic);

    UserDTO findDriverByUsername(String username);
}
