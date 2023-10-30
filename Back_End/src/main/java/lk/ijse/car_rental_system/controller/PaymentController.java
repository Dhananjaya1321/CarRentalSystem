package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.service.PaymentService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    PaymentService paymentService;

    @GetMapping(path = "/last_id")
    public ResponseUtil getLastPaymentID(){
        return new ResponseUtil("Ok","Successfully loaded...!",paymentService.getLastPaymentID());
    }
}
