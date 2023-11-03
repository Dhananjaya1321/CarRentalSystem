package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.dto.UserDTO;
import lk.ijse.car_rental_system.entity.Driver;
import lk.ijse.car_rental_system.entity.User;
import lk.ijse.car_rental_system.repo.CustomerRepo;
import lk.ijse.car_rental_system.repo.DriverRepo;
import lk.ijse.car_rental_system.repo.UserRepo;
import lk.ijse.car_rental_system.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Random;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public UserDTO findUser(String username) {
        User user = userRepo.findById(username).get();
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> all = userRepo.findAll();
        return modelMapper.map(all, new TypeToken<List<UserDTO>>() {
        }.getType());
    }

    @Override
    public void updatePassword(UserDTO dto) {
        User user = userRepo.findById(dto.getUsername()).get();
        user.setPassword(dto.getPassword());
        userRepo.save(user);
    }

    @Override
    public int sendEmail(String username) {
        Random random = new Random();
        int otp = random.nextInt(9999 - 1000 + 1) + 1000;
        UserDTO user = findUser(username);
        String role = user.getRole();
        String to;
        if (role.equals("customer")) {
            to=customerRepo.findCustomerByUsername(username).getEmail();
        } else {
            String driverId = driverRepo.getDriverId(username);
            to=driverRepo.findById(driverId).get().getEmail();
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Easy Rental Car");
        message.setText(
                "Do you want to change your password?\n" +
                "OTP : "+otp+
                "\nEnter this OTP code in the email verification form"
        );

        javaMailSender.send(message);
        return otp;
    }
}
