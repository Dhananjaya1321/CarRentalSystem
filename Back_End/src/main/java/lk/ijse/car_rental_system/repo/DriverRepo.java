package lk.ijse.car_rental_system.repo;

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

    @Query(value = "SELECT * from schedule where registration_number=?2 and rental_id=?1", nativeQuery = true)
    List<Schedule> findDriverFromSchedule(String rental_id, String registration_number);

}
