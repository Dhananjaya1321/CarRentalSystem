package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.CarDTO;
import lk.ijse.car_rental_system.entity.Car;
import lk.ijse.car_rental_system.repo.CarRepo;
import lk.ijse.car_rental_system.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;

@Service
@Transactional
public class CarServiceImpl implements CarService {
    @Autowired
    CarRepo carRepo;

    @Override
    public void saveCar(CarDTO dto) {
        if (carRepo.existsById(dto.getRegistration_number())){
            throw new RuntimeException(dto.getRegistration_number()+" already exists");
        }


        String uploadDir = "C:\\Users\\ACER\\Documents\\WorkZone\\CarRentalSystem\\Back_End\\src\\main\\resources\\files\\" + "cars";

        MultipartFile back_image = dto.getBack_image();
        MultipartFile front_image = dto.getFront_image();
        MultipartFile side_image = dto.getSide_image();
        MultipartFile interior_image = dto.getInterior_image();
        try {
            back_image.transferTo(new File(new File(uploadDir, back_image.getOriginalFilename()).getAbsolutePath()));
            front_image.transferTo(new File(new File(uploadDir, front_image.getOriginalFilename()).getAbsolutePath()));
            side_image.transferTo(new File(new File(uploadDir, side_image.getOriginalFilename()).getAbsolutePath()));
            interior_image.transferTo(new File(new File(uploadDir, interior_image.getOriginalFilename()).getAbsolutePath()));

            carRepo.save(
                    new Car(
                            dto.getRegistration_number(),
                            back_image.getOriginalFilename(),
                            dto.getBrand(),
                            dto.getColor(),
                            dto.getFree_mileage_for_day(),
                            dto.getFree_mileage_for_month(),
                            front_image.getOriginalFilename(),
                            dto.getFuel_type(),
                            interior_image.getOriginalFilename(),
                            dto.getMileage_after_maintenance(),
                            0,
                            dto.getNumber_of_passengers(),
                            dto.getPrice_for_day(),
                            dto.getPrice_for_extra_km(),
                            dto.getPrice_for_month(),
                            side_image.getOriginalFilename(),
                            "available",
                            dto.getTransmission_type(),
                            dto.getType()
                    )
            );
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
