package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.CustomDTO;
import lk.ijse.car_rental_system.dto.RequestDTO;
import lk.ijse.car_rental_system.entity.Request;

import java.util.List;

public interface RequestService {
    String getLastRequestID();

    void rejectRequest(RequestDTO dto);

    List<CustomDTO> getAllPendingRequests();
}
