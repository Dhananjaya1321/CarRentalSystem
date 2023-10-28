package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.RentalDTO;
import lk.ijse.car_rental_system.service.RentalService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/rental")
public class RentalController {
    @Autowired
    RentalService rentalService;

    @GetMapping(path = "/last_ID")
    public ResponseUtil getLastRentalID(){
        return new ResponseUtil("Ok","Successfully loaded...!",rentalService.getLastRentalID());
    }
}
