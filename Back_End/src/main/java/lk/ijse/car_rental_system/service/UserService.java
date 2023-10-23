package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.UserDTO;

public interface UserService {
    UserDTO findUser(String username);

}
