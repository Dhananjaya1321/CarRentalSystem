package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.DriverDTO;
import lk.ijse.car_rental_system.dto.UserDTO;
import lk.ijse.car_rental_system.entity.Driver;
import lk.ijse.car_rental_system.entity.User;
import lk.ijse.car_rental_system.repo.UserRepo;
import lk.ijse.car_rental_system.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public UserDTO findUser(String username){
        User user = userRepo.findById(username).get();
        return modelMapper.map(user, UserDTO.class);
    }
    @Override
    public List<UserDTO> getAllUsers() {
        List<User> all = userRepo.findAll();
        return modelMapper.map(all, new TypeToken<List<UserDTO>>() {
        }.getType());
    }
}
