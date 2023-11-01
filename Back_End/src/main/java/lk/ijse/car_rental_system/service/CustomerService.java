package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.CustomerDTO;
import lk.ijse.car_rental_system.entity.CustomEntity;

import java.io.IOException;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto) throws IOException;

    String getCustomerNIC(String username);

    int getRegisteredCustomerCount();

    CustomEntity getCustomerDetails(String username);
}
