package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.CustomDTO;
import lk.ijse.car_rental_system.dto.RentalDTO;
import lk.ijse.car_rental_system.dto.RequestDTO;

import java.util.List;

public interface RequestService {
    String getLastRequestID();

    void rejectRequest(RequestDTO dto);


    void acceptRequest(RequestDTO dto);

    void acceptRequestAndChangeDriver(RentalDTO dto, String loss_damage_back_slip);

    int getPendingRequestCount();

    int getAcceptedRequestRequestCountForTheDay(String date);

    List<CustomDTO> getAllPendingRequests();
}
