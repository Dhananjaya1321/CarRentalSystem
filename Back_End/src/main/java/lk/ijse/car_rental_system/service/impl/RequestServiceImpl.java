package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.repo.RequestRepo;
import lk.ijse.car_rental_system.service.RequestService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class RequestServiceImpl implements RequestService {
    @Autowired
    RequestRepo requestRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public String getLastRequestID(){
        return requestRepo.findLastRequestID();
    }
}
