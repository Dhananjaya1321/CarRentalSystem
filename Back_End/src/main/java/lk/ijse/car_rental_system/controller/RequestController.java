package lk.ijse.car_rental_system.controller;

import lk.ijse.car_rental_system.dto.RequestDTO;
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

    @GetMapping(path = "/last_ID")
    public ResponseUtil getLastRequestID() {
        return new ResponseUtil("Ok", "Successfully loaded...!", requestService.getLastRequestID());
    }

    @GetMapping(path = "/pending")
    public ResponseUtil getAllPendingRequests() {
        return new ResponseUtil("Ok", "Successfully loaded...!", requestService.getAllPendingRequests());
    }
}
