package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.service.RequestService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("request")
public class RequestController {
    @Autowired
    RequestService requestService;

    @GetMapping(path = "/last_ID")
    public ResponseUtil getLastRequestID(){
        return new ResponseUtil("Ok","Successfully loaded...!",requestService.getLastRequestID());
    }
    @GetMapping(path = "/pending")
    public ResponseUtil getAllPendingRequests(){
        return new ResponseUtil("Ok","Successfully loaded...!",requestService.getAllPendingRequests());
    }
}
