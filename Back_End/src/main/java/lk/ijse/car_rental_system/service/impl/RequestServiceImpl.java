package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.CustomDTO;
import lk.ijse.car_rental_system.dto.RentalDTO;
import lk.ijse.car_rental_system.dto.RequestDTO;
import lk.ijse.car_rental_system.dto.ScheduleDTO;
import lk.ijse.car_rental_system.entity.*;
import lk.ijse.car_rental_system.repo.DriverRepo;
import lk.ijse.car_rental_system.repo.RentalRepo;
import lk.ijse.car_rental_system.repo.RequestRepo;
import lk.ijse.car_rental_system.repo.ScheduleRepo;
import lk.ijse.car_rental_system.service.RequestService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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
    @Autowired
    ScheduleRepo scheduleRepo;
    @Autowired
    RentalRepo rentalRepo;

    @Override
    public String getLastRequestID() {
        return requestRepo.findLastRequestID();
    }

    @Override
    public void rejectRequest(RequestDTO dto) {
        requestRepo.save(modelMapper.map(dto, Request.class));
    }

    @Override
    public void acceptRequest(RequestDTO dto) {
        requestRepo.save(modelMapper.map(dto, Request.class));
    }

    @Override
    public void acceptRequestAndChangeDriver(RentalDTO dto, String loss_damage_back_slip) {
       /*modifying*/
        Customer customer = modelMapper.map(dto.getCustomer(), Customer.class);
        ArrayList<CustomEntity> allPendingRequests = requestRepo.findAllPendingRequests();
        for (CustomEntity c : allPendingRequests) {
            if (dto.getRental_id().equals(c.getRental_id())) {
                for (int i = 0; i < dto.getRequest().size(); i++) {
                    if (dto.getRequest().get(i).getRequest_id().equals(c.getRequest_id())) {
                        dto.setPick_up_time(c.getPick_up_time());
                        dto.setReturn_time(c.getReturn_time());
                    }
                }
            }
        }
        List<Request> requests = modelMapper.map(dto.getRequest(), new TypeToken<ArrayList<Request>>() {
        }.getType());
        List<RentalCarDetails> rentalCarDetails = modelMapper.map(dto.getRentalCarDetails(), new TypeToken<ArrayList<RentalCarDetails>>() {
        }.getType());
        rentalRepo.save(new Rental(
                dto.getRental_id(),
                dto.getDriver_or_not(),
                dto.getLocation(),
                loss_damage_back_slip,
                dto.getPick_up_date(),
                dto.getPick_up_time(),
                dto.getReturn_date(),
                dto.getReturn_time(),
                customer,
                requests,
                rentalCarDetails

        ));
    }

    @Override
    public int getPendingRequestCount() {
       return requestRepo.getPendingRequestCount();
    }
    @Override
    public int getAcceptedRequestRequestCountForTheDay(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate currentDate = LocalDate.parse(date, formatter);

        return requestRepo.getAcceptedRequestRequestCountForTheDay(currentDate);
    }
    @Override
    public List<CustomDTO> getAllPendingRequests() {
        ArrayList<CustomEntity> allPendingRequests = requestRepo.findAllPendingRequests();
        for (CustomEntity c : allPendingRequests) {
//            List<Schedule> driverFromSchedule = driverRepo.findDriverFromSchedule(c.getRental_id(), c.getRegistration_number());
            List<CustomEntity> driverFromSchedule = driverRepo.findDriverFromSchedule(c.getRental_id(), c.getRegistration_number());
            for (CustomEntity s : driverFromSchedule) {
                if (c.getRental_id().equals(s.getRental_id()) && c.getRegistration_number().equals(s.getRegistration_number())) {
                    c.setDriver_id(s.getDriver_id());
                    System.out.println(s.getDriver_id());
                }
                System.out.println("\n\n" + s.getDriver_id());
            }
        }
        System.out.println();
        return modelMapper.map(allPendingRequests, new TypeToken<List<CustomDTO>>() {
        }.getType());
    }
}
