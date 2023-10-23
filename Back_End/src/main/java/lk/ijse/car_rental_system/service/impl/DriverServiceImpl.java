package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.entity.Driver;
import lk.ijse.car_rental_system.repo.DriverRepo;
import lk.ijse.car_rental_system.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {
    @Autowired
    DriverRepo  driverRepo;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<DriverDTO> getAllDrivers(){
        List<Driver> all = driverRepo.findAll();
        return modelMapper.map(all, new TypeToken<List<DriverDTO>>() {
        }.getType());
    }
}
