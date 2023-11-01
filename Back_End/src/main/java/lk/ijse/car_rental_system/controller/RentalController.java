package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.RentalDTO;
import lk.ijse.car_rental_system.service.RentalService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@RestController
@CrossOrigin
@RequestMapping("/rental")
public class RentalController {
    @Autowired
    RentalService rentalService;

    @PostMapping
    public ResponseUtil saveRental(@RequestPart("loss_damage_back_slip") MultipartFile lossDamageBackSlip, @RequestPart("dto") RentalDTO dto) throws IOException {
        dto.setLoss_damage_back_slip(lossDamageBackSlip);
        System.out.println("\n\n\n" + dto.toString());
        rentalService.saveRental(dto);
        return new ResponseUtil("Ok", "Successfully Added...!", dto.getRental_id());
    }

    @GetMapping(path = "/last_ID")
    public ResponseUtil getLastRentalID() {
        return new ResponseUtil("Ok", "Successfully loaded...!", rentalService.getLastRentalID());
    }

    @GetMapping(path = "/count", params = {"date"})
    public ResponseUtil getTotalBookingCountForTheDay(String date) {
        return new ResponseUtil("Ok", "Successfully loaded...!", rentalService.getTotalBookingCountForTheDay(date));
    }
}
