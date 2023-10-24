package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.CustomerDTO;
import lk.ijse.car_rental_system.dto.UserDTO;
import lk.ijse.car_rental_system.service.CustomerService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;


    @PostMapping
    public ResponseUtil saveCustomer(CustomerDTO dto, UserDTO user) {
        user.setRole("customer");
        dto.setUser(user);
        try {
            customerService.saveCustomer(dto);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseUtil("Ok", "Successfully added...!", user.getUsername());
    }
}
