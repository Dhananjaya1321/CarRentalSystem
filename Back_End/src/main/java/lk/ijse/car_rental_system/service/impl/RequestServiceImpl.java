package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.CustomDTO;
import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.dto.RequestDTO;
import lk.ijse.car_rental_system.dto.ScheduleDTO;
import lk.ijse.car_rental_system.entity.CustomEntity;
import lk.ijse.car_rental_system.entity.Request;
import lk.ijse.car_rental_system.entity.Schedule;
import lk.ijse.car_rental_system.repo.DriverRepo;
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

    @Autowired
    DriverRepo driverRepo;

    @Override
    public String getLastRequestID() {
        return requestRepo.findLastRequestID();
    }

    @Override
    public void rejectRequest(RequestDTO dto) {
        requestRepo.save(modelMapper.map(dto,Request.class));
    }

    @Override
    public List<CustomDTO> getAllPendingRequests() {
        ArrayList<CustomEntity> allPendingRequests = requestRepo.findAllPendingRequests();
        for (CustomEntity c : allPendingRequests) {
//            List<Schedule> driverFromSchedule = driverRepo.findDriverFromSchedule(c.getRental_id(), c.getRegistration_number());
            List<CustomEntity> driverFromSchedule = driverRepo.findDriverFromSchedule(c.getRental_id(), c.getRegistration_number());
            for (CustomEntity s:driverFromSchedule) {
                if (c.getRental_id().equals(s.getRental_id()) && c.getRegistration_number().equals(s.getRegistration_number())){
                    c.setDriver_id(s.getDriver_id());
                    System.out.println(s.getDriver_id());
                }
                System.out.println("\n\n"+s.getDriver_id());
            }
        }
        System.out.println();
        return modelMapper.map(allPendingRequests, new TypeToken<List<CustomDTO>>() {
        }.getType());
    }
}
