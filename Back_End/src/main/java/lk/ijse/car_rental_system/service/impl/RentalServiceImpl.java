package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.RentalDTO;
import lk.ijse.car_rental_system.entity.*;
import lk.ijse.car_rental_system.repo.RentalRepo;
import lk.ijse.car_rental_system.repo.RequestRepo;
import lk.ijse.car_rental_system.service.RentalService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RentalServiceImpl implements RentalService {
    @Autowired
    RentalRepo rentalRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public String getLastRentalID() {
        return rentalRepo.findLastRentalID();
    }

    @Override
    public void saveRental(RentalDTO dto) throws IOException {
        String uploadDir = "C:\\Users\\ACER\\Documents\\WorkZone\\CarRentalSystem\\Back_End\\src\\main\\resources\\files\\" + "bankSlip";

        MultipartFile bank_slip = dto.getLoss_damage_back_slip();

        bank_slip.transferTo(new File(new File(uploadDir, bank_slip.getOriginalFilename()).getAbsolutePath()));

        Customer customer = modelMapper.map(dto.getCustomer(), Customer.class);
        List<Request> requests = modelMapper.map(dto.getRequest(), new TypeToken<ArrayList<Request>>() {
        }.getType());
        List<Schedule> schedule = modelMapper.map(dto.getSchedule(), new TypeToken<ArrayList<Schedule>>() {
        }.getType());
        List<RentalCarDetails> rentalCarDetails = modelMapper.map(dto.getRentalCarDetails(), new TypeToken<ArrayList<RentalCarDetails>>() {
        }.getType());
        rentalRepo.save(
                new Rental(
                        dto.getRental_id(),
                        dto.getDriver_or_not(),
                        dto.getLocation(),
                        bank_slip.getOriginalFilename(),
                        dto.getPick_up_date(),
                        dto.getPick_up_time(),
                        dto.getReturn_date(),
                        dto.getReturn_time(),
                        customer,
                        requests,
//                        schedule,
                        rentalCarDetails
                )
        );
    }


}
