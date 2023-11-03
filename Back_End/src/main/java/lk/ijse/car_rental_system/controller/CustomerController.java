package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.CustomerDTO;
import lk.ijse.car_rental_system.dto.UserDTO;
import lk.ijse.car_rental_system.service.CustomerService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;


    @PostMapping
    public ResponseUtil saveCustomer(CustomerDTO dto, UserDTO user) throws IOException {
        user.setRole("customer");
        dto.setUser(user);
        customerService.saveCustomer(dto);
        return new ResponseUtil("Ok", "Successfully added...!", user.getUsername());
    }
    @PutMapping
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto) {
        customerService.updateCustomer(dto);
        return new ResponseUtil("Ok", "Successfully added...!", dto.getUser().getUsername());
    }

    @GetMapping(params = {"username"})
    public ResponseUtil getCustomerNIC(String username) {
        return new ResponseUtil("Ok", "Successfully loaded...!", customerService.getCustomerNIC(username));
    }

    @GetMapping(path = "/count")
    public ResponseUtil getRegisteredCustomerCount() {
        return new ResponseUtil("Ok", "Successfully loaded...!", customerService.getRegisteredCustomerCount());
    }

    @GetMapping(path = "/customer", params = {"username"})
    public ResponseUtil getCustomerDetails(String username) {
        return new ResponseUtil("Ok", "Successfully loaded...!", customerService.getCustomerDetails(username));
    }

    @GetMapping(path = "/requests", params = {"nic"})
    public ResponseUtil getRequests(String nic) {
        return new ResponseUtil("Ok", "Successfully loaded...!", customerService.getRequests(nic));
    }
    @GetMapping
    public ResponseUtil getAllCustomers() {
        return new ResponseUtil("Ok", "Successfully loaded...!", customerService.getAllCustomers());
    }
}
