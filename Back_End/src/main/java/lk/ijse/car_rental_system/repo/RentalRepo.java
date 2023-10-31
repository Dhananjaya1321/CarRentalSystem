package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.CustomEntity;
import lk.ijse.car_rental_system.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface RentalRepo extends JpaRepository<Rental,String> {
    @Query(value = "SELECT rental_id FROM rental ORDER BY rental_id DESC LIMIT 1",nativeQuery = true)
    String findLastRentalID();

    @Query(value = "SELECT COUNT(rental_id) FROM rental where pick_up_date=?1",nativeQuery = true)
    int getTotalBookingCountForTheDay(LocalDate date);

}