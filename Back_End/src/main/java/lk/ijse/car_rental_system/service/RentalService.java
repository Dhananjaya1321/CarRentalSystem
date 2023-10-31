package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.CustomDTO;
import lk.ijse.car_rental_system.dto.RentalDTO;

import java.io.IOException;
import java.util.List;

public interface RentalService {
    String getLastRentalID();

    int getTotalBookingCountForTheDay(String date);

    void saveRental(RentalDTO dto) throws IOException;
}
