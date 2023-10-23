package lk.ijse.car_rental_system.service.impl;

import lk.ijse.car_rental_system.dto.UserDTO;
import lk.ijse.car_rental_system.entity.User;
import lk.ijse.car_rental_system.repo.UserRepo;
import lk.ijse.car_rental_system.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public UserDTO findUser(String username){
        User user = userRepo.findById(username).get();
        return mapper.map(user, UserDTO.class);
    }
}
