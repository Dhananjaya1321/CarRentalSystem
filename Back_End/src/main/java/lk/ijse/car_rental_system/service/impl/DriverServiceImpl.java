package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.dto.UserDTO;
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

import javax.transaction.Transactional;
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
        return modelMapper.map(all, new TypeToken<List<DriverDTO>>() {
        }.getType());
    }

    @Override
    public void saveDriver(DriverDTO dto) {
        if (driverRepo.existsById(dto.getDriver_id())) {
            throw new RuntimeException(dto.getDriver_id()+" Driver is already available");
        }
        driverRepo.save(modelMapper.map(dto, Driver.class));
    }

    @Override
    public void deleteDriver(String driver_id) {
        if (!driverRepo.existsById(driver_id)) {
            throw new RuntimeException(driver_id+" Driver is not available, please check the ID before delete");
        }
        driverRepo.deleteById(driver_id);
    }

    @Override
    public DriverDTO findDriverByNic(String nic) {
        return modelMapper.map(driverRepo.findByNic(nic), DriverDTO.class);
    }

    @Override
    public UserDTO findDriverByUsername(String username) {
        if (!userRepo.existsById(username)) {
            throw new RuntimeException(username+" username is not available");
        }
        return modelMapper.map(userRepo.findById(username), UserDTO.class);
    }
}
