package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.CustomerDTO;

import java.io.IOException;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto) throws IOException;
}
