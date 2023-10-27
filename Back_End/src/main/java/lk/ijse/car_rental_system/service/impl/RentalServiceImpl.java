package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.repo.RentalRepo;
import lk.ijse.car_rental_system.repo.RequestRepo;
import lk.ijse.car_rental_system.service.RentalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class RentalServiceImpl implements RentalService {
    @Autowired
    RentalRepo rentalRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public String getLastRentalID(){
        return rentalRepo.findLastRentalID();
    }
}
