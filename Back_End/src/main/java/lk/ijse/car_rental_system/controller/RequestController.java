package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.RentalDTO;
import lk.ijse.car_rental_system.dto.RequestDTO;
import lk.ijse.car_rental_system.dto.ScheduleDTO;
import lk.ijse.car_rental_system.service.RequestService;
import lk.ijse.car_rental_system.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("request")
public class RequestController {
    @Autowired
    RequestService requestService;

    @PutMapping
    public ResponseUtil rejectRequest(@RequestBody RequestDTO dto) {
        requestService.rejectRequest(dto);
        return new ResponseUtil("Ok", "Successfully updated...!", dto.getRequest_id());
    }

    @PutMapping(path = "/accept")
    public ResponseUtil acceptRequest(@RequestBody RequestDTO dto) {
        requestService.acceptRequest(dto);
        return new ResponseUtil("Ok", "Successfully updated...!", dto.getRequest_id());
    }

    @PutMapping(path = "/accept", params = {"loss_damage_back_slip"})
    public ResponseUtil acceptRequestAndChangeDriver(@RequestBody RentalDTO dto, String loss_damage_back_slip) {
        requestService.acceptRequestAndChangeDriver(dto, loss_damage_back_slip);
        return new ResponseUtil("Ok", "Successfully updated...!", dto.getRental_id());
    }

    @GetMapping(path = "/last_ID")
    public ResponseUtil getLastRequestID() {
        return new ResponseUtil("Ok", "Successfully loaded...!", requestService.getLastRequestID());
    }

    @GetMapping(path = "/pending/count")
    public ResponseUtil getPendingRequestCount() {
        return new ResponseUtil("Ok", "Successfully loaded...!", requestService.getPendingRequestCount());
    }

    @GetMapping(path = "/accept/count",params = {"date"})
    public ResponseUtil getAcceptedRequestRequestCountForTheDay(String date) {
        return new ResponseUtil("Ok", "Successfully loaded...!", requestService.getAcceptedRequestRequestCountForTheDay(date));
    }

    @GetMapping(path = "/pending")
    public ResponseUtil getAllPendingRequests() {
        return new ResponseUtil("Ok", "Successfully loaded...!", requestService.getAllPendingRequests());
    }

    @GetMapping
    public ResponseUtil getAllPendingPaymentRequest(){
        return new ResponseUtil("Ok","Successfully loaded...!",requestService.getAllPendingPaymentRequest());
    }
}
