package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.CustomDTO;
import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.dto.RequestDTO;
import lk.ijse.car_rental_system.entity.Request;
import lk.ijse.car_rental_system.repo.RequestRepo;
import lk.ijse.car_rental_system.service.RequestService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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
    @Override
    public List<CustomDTO> getAllPendingRequests(){
//        ArrayList<CustomDTO> allPendingRequests = requestRepo.findAllPendingRequests();
//        System.out.println("\n\n\n\n"+allPendingRequests.get(0).toString());
        return modelMapper.map(requestRepo.findAllPendingRequests(), new TypeToken<List<CustomDTO>>() {
        }.getType());
    }
}
