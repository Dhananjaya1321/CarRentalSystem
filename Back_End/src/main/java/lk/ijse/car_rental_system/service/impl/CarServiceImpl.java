package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.CarDTO;
import lk.ijse.car_rental_system.entity.Car;
import lk.ijse.car_rental_system.repo.CarRepo;
import lk.ijse.car_rental_system.service.CarService;
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
import java.util.Optional;

@Service
@Transactional
public class CarServiceImpl implements CarService {
    @Autowired
    CarRepo carRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public void saveCar(CarDTO dto) throws IOException {
        if (carRepo.existsById(dto.getRegistration_number())) {
            throw new RuntimeException(dto.getRegistration_number() + " already exists");
        }


        String uploadDir = "C:\\Users\\ACER\\Documents\\WorkZone\\CarRentalSystem\\Back_End\\src\\main\\resources\\files\\" + "cars";

        MultipartFile back_image = dto.getBack_image();
        MultipartFile front_image = dto.getFront_image();
        MultipartFile side_image = dto.getSide_image();
        MultipartFile interior_image = dto.getInterior_image();

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
    }

    @Override
    public void updateCarStatus(String registration_number, String status) {
        carRepo.updateCarStatus(status, 0, registration_number);
    }

    @Override
    public void deleteCar(String registration_number) {
        if (!carRepo.existsById(registration_number)) {
            throw new RuntimeException(registration_number + " this registration number is not available");
        }
        carRepo.deleteById(registration_number);
    }

    @Override
    public List<CarDTO> getAllCars() {
        return modelMapper.map(carRepo.findAll(), new TypeToken<ArrayList<Car>>() {
        }.getType());
    }

    @Override
    public List<String> getCarBrands() {
        return carRepo.searchCarBrands();
    }

    @Override
    public List<Double> getCarDailyRates() {
        return carRepo.searchCarDailyRates();
    }

    @Override
    public List<CarDTO> searchCarByRegistrationNumber(String registration_number) {
        Car car = carRepo.findById(registration_number).get();
        ArrayList<Car> cars = new ArrayList<>();
        cars.add(car);
        return modelMapper.map(cars, new TypeToken<ArrayList<Car>>() {
        }.getType());
    }
}
