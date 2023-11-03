package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.UserDTO;

import java.util.List;

public interface UserService {
    UserDTO findUser(String username);

    List<UserDTO> getAllUsers();

    int sendEmail(String username);
}
