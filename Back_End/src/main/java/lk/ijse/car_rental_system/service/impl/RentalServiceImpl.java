package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.RentalDTO;
import lk.ijse.car_rental_system.entity.*;
import lk.ijse.car_rental_system.repo.DriverRepo;
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
import java.util.*;

@Service
@Transactional
public class RentalServiceImpl implements RentalService {
    @Autowired
    RentalRepo rentalRepo;
    @Autowired
    DriverRepo driverRepo;

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
        List<RentalCarDetails> rentalCarDetails = modelMapper.map(dto.getRentalCarDetails(), new TypeToken<ArrayList<RentalCarDetails>>() {
        }.getType());

        if (dto.getDriver_or_not().equals("yes")) {
//            List<Driver> allAvailableDrivers = driverRepo.findAllAvailableDrivers(dto.getPick_up_date(), dto.getReturn_date());
            List<Driver> allAvailableDrivers = driverRepo.findAll();
            if (allAvailableDrivers.size() >= dto.getSchedule().size()) {
                Set<Integer> uniqueRandomValues = new HashSet<>();
                Random random = new Random();

                while (uniqueRandomValues.size() < dto.getSchedule().size()) {
                    int randomNumber = random.nextInt(allAvailableDrivers.size() + 1);
                    uniqueRandomValues.add(randomNumber);
                }
                int count = 0;
                for (int value : uniqueRandomValues) {
                    System.out.println(value);
                    dto.getSchedule().get(count).setDriver_id(allAvailableDrivers.get(value).getDriver_id());
                    count++;
                }
            } else {
                throw new RuntimeException("We don't have " + dto.getSchedule().size() + " drivers available these days");
            }
        }/*drivers assign randomly*/
        List<Schedule> schedule = modelMapper.map(dto.getSchedule(), new TypeToken<ArrayList<Schedule>>() {
        }.getType());

        if (dto.getDriver_or_not().equals("yes")) {
            System.out.println("\n\nok");
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
                            schedule,
                            rentalCarDetails
                    )
            );
        } else {
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
}
