package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.CustomDTO;
import lk.ijse.car_rental_system.dto.CustomerDTO;
import lk.ijse.car_rental_system.entity.CustomEntity;

import java.io.IOException;
import java.util.List;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto) throws IOException;

    void updateCustomer(CustomerDTO dto);

    String getCustomerNIC(String username);

    int getRegisteredCustomerCount();

    CustomEntity getCustomerDetails(String username);

    List<CustomDTO> getRequests(String nic);
}
