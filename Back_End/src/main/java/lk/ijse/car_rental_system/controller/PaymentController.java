package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.PaymentDTO;
import lk.ijse.car_rental_system.service.PaymentService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping(path = "/cart")
    public ResponseUtil saveCartPayment(@RequestBody List<PaymentDTO> dto){
        System.out.println("\n\n"+dto.toString());
        paymentService.saveCartPayment(dto);
        return new ResponseUtil("Ok","Successfully loaded...!","dto.getPayment_id()");
    }

    @PutMapping(params = {"thisRentalMiles","registration_number"})
    public ResponseUtil updatePayment(@RequestBody PaymentDTO dto, int thisRentalMiles,String registration_number) {
        System.out.println("\n\n" + dto.toString()+thisRentalMiles);
        paymentService.updatePayment(dto,thisRentalMiles,registration_number);
        return new ResponseUtil("Ok", "Successfully updated...!", dto.getPayment_id());
    }

    @GetMapping(path = "/last_id")
    public ResponseUtil getLastPaymentID(){
        return new ResponseUtil("Ok","Successfully loaded...!",paymentService.getLastPaymentID());
    }
}
