package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.CustomerDTO;
import lk.ijse.car_rental_system.entity.Customer;
import lk.ijse.car_rental_system.entity.User;
import lk.ijse.car_rental_system.repo.CustomerRepo;
import lk.ijse.car_rental_system.service.CarService;
import lk.ijse.car_rental_system.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public void saveCustomer(CustomerDTO dto) throws IOException {
        String uploadDir = "C:\\Users\\ACER\\Documents\\WorkZone\\CarRentalSystem\\Back_End\\src\\main\\resources\\files\\" + "upload-dir";

        MultipartFile license_back_photo = dto.getLicense_back_photo();
        MultipartFile license_front_photo = dto.getLicense_front_photo();
        MultipartFile nic_front_photo = dto.getNic_front_photo();
        MultipartFile nic_back_photo = dto.getNic_back_photo();
        license_back_photo.transferTo(new File(new File(uploadDir, license_back_photo.getOriginalFilename()).getAbsolutePath()));
        license_front_photo.transferTo(new File(new File(uploadDir, license_front_photo.getOriginalFilename()).getAbsolutePath()));
        nic_front_photo.transferTo(new File(new File(uploadDir, nic_front_photo.getOriginalFilename()).getAbsolutePath()));
        nic_back_photo.transferTo(new File(new File(uploadDir, nic_back_photo.getOriginalFilename()).getAbsolutePath()));


        customerRepo.save(
                new Customer(
                        dto.getNic(),
                        nic_front_photo.getOriginalFilename(),
                        nic_back_photo.getOriginalFilename(),
                        dto.getAddress(),
                        dto.getContact(),
                        dto.getDriving_license_number(),
                        license_front_photo.getOriginalFilename(),
                        license_back_photo.getOriginalFilename(),
                        dto.getEmail(),
                        new User(dto.getUser().getUsername(), dto.getUser().getPassword(), "customer")
                )
        );

    }

    @Override
    public String getCustomerNIC(String username){
        return customerRepo.findCustomerNIC(username);
    }

    @Override
    public int getRegisteredCustomerCount(){
        return customerRepo.getCustomerCount();
    }

}
