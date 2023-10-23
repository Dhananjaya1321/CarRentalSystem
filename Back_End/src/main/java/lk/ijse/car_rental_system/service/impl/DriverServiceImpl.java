package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.DriverDTO;
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
    public void saveDriver(@RequestBody DriverDTO dto) {
        driverRepo.save(modelMapper.map(dto, Driver.class));
        System.out.println("ok");
    }
}
