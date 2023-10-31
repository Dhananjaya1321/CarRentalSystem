package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.PaymentDTO;
import lk.ijse.car_rental_system.service.PaymentService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    PaymentService paymentService;

    @PostMapping
    public ResponseUtil savePayment(@RequestBody PaymentDTO dto){
        System.out.println("\n\n"+dto.toString());
        paymentService.savePayment(dto);
        return new ResponseUtil("Ok","Successfully loaded...!",dto.getPayment_id());
    }

    @GetMapping(path = "/last_id")
    public ResponseUtil getLastPaymentID(){
        return new ResponseUtil("Ok","Successfully loaded...!",paymentService.getLastPaymentID());
    }
}
