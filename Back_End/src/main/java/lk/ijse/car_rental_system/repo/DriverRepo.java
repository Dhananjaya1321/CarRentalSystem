package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.CustomEntity;
import lk.ijse.car_rental_system.entity.Driver;
import lk.ijse.car_rental_system.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface DriverRepo extends JpaRepository<Driver, String> {
    Driver findByNic(String nic);

    @Query(value = "SELECT d.driver_id FROM Driver d JOIN Schedule s ON d.driver_id = s.driver_id JOIN Rental r ON s.rental_id = r.rental_id where not (r.pick_up_date>=?1 and r.return_date<=?2)", nativeQuery = true)
    List<Driver> findAllAvailableDrivers(LocalDate pickUpDate, LocalDate ReturnUpDate);

//    @Query(value = "SELECT s FROM Schedule s WHERE s.rental_id = ?1 AND s.registration_number = ?2")
    @Query("SELECT NEW lk.ijse.car_rental_system.entity.CustomEntity(s.driver_id,s.registration_number,s.rental_id) " +
            "FROM Schedule s WHERE s.rental_id = ?1 AND s.registration_number = ?2")
    List<CustomEntity> findDriverFromSchedule(String rental_id, String registration_number);

}
