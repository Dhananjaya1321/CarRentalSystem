package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.dto.ScheduleDTO;
import lk.ijse.car_rental_system.dto.UserDTO;
import lk.ijse.car_rental_system.entity.Car;
import lk.ijse.car_rental_system.entity.Driver;
import lk.ijse.car_rental_system.entity.User;
import lk.ijse.car_rental_system.repo.DriverRepo;
import lk.ijse.car_rental_system.repo.UserRepo;
import lk.ijse.car_rental_system.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {
    @Autowired
    DriverRepo driverRepo;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserRepo userRepo;

    @Override
    public List<DriverDTO> getAllDrivers() {
        List<Driver> all = driverRepo.findAll();
        return modelMapper.map(all, new TypeToken<List<Driver>>() {
        }.getType());
    }

    @Override
    public void saveDriver(DriverDTO dto) {
        if (driverRepo.existsById(dto.getDriver_id())) {
            throw new RuntimeException(dto.getDriver_id() + " Driver is already available");
        }
        driverRepo.save(modelMapper.map(dto, Driver.class));
    }
    @Override
    public void updateDriver(DriverDTO dto){
       driverRepo.save(modelMapper.map(dto,Driver.class));
    }

    @Override
    public void deleteDriver(String driver_id) {
        if (!driverRepo.existsById(driver_id)) {
            throw new RuntimeException(driver_id + " Driver is not available, please check the ID before delete");
        }
        driverRepo.deleteById(driver_id);
    }

    @Override
    public DriverDTO findDriverByNic(String nic) {
        return modelMapper.map(driverRepo.findByNic(nic), DriverDTO.class);
    }

    @Override
    public ScheduleDTO findDriverFromSchedule(String rental_id, String registration_number) {
        return modelMapper.map(driverRepo.findDriverFromSchedule(rental_id, registration_number), ScheduleDTO.class);
    }

    @Override
    public DriverDTO getDriverByDriverId(String driver_id) {
        return modelMapper.map(driverRepo.findById(driver_id), DriverDTO.class);
    }

    @Override
    public int getAvailableDriversCount() {
        return driverRepo.getAvailableDriversCount();
    }


    @Override
    public int getOccupiedDriversCount(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate currentDate = LocalDate.parse(date, formatter);
        return driverRepo.getOccupiedDriversCount(currentDate);
    }

    @Override
    public UserDTO findDriverByUsername(String username) {
        if (!userRepo.existsById(username)) {
            throw new RuntimeException(username + " username is not available");
        }
        return modelMapper.map(userRepo.findById(username), UserDTO.class);
    }
    @Override
    public String getDriverId(String username) {
        return driverRepo.getDriverId(username);
    }
}
