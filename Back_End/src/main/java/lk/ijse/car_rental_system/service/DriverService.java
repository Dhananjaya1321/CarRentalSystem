package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.CustomDTO;
import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.dto.ScheduleDTO;
import lk.ijse.car_rental_system.dto.UserDTO;

import java.io.IOException;
import java.util.List;

public interface DriverService {
    List<DriverDTO> getAllDrivers();

    void saveDriver(DriverDTO dto);

    void updateDriver(DriverDTO dto);

    void deleteDriver(String driver_id);

    DriverDTO findDriverByNic(String nic);

    ScheduleDTO findDriverFromSchedule(String rental_id, String registration_number);

    DriverDTO getDriverByDriverId(String driver_id);

    int getAvailableDriversCount();

    int getOccupiedDriversCount(String date);

    UserDTO findDriverByUsername(String username);

    String getDriverId(String username);

    List<CustomDTO> getDriverSchedule(String driver_id);
}
