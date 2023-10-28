package lk.ijse.car_rental_system.service;

import lk.ijse.car_rental_system.dto.RentalDTO;

import java.io.IOException;

public interface RentalService {
    String getLastRentalID();

    void saveRental(RentalDTO dto) throws IOException;
}
