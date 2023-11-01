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

    @Query(value = "SELECT DISTINCT d.driver_id FROM Driver d LEFT JOIN Schedule s ON d.driver_id = s.driver_id " +
            "LEFT JOIN Rental r ON s.rental_id = r.rental_id WHERE s.driver_id IS NULL or not" +
            " (r.pick_up_date>=?1 and r.return_date<=?2)", nativeQuery = true)
    List<String> findAllAvailableDrivers(LocalDate pickUpDate, LocalDate ReturnUpDate);

    //    @Query(value = "SELECT s FROM Schedule s WHERE s.rental_id = ?1 AND s.registration_number = ?2")
    @Query("SELECT NEW lk.ijse.car_rental_system.entity.CustomEntity(s.driver_id,s.registration_number,s.rental_id) " +
            "FROM Schedule s WHERE s.rental_id = ?1 AND s.registration_number = ?2")
    List<CustomEntity> findDriverFromSchedule(String rental_id, String registration_number);

    @Query(value = "select count(distinct driver.driver_id) from driver join schedule on driver.driver_id = schedule.driver_id join rental on rental.rental_id = schedule.rental_id where rental.pick_up_date>=?1", nativeQuery = true)
    int getOccupiedDriversCount(LocalDate date);

    @Query(value = "select count(driver_id) from driver", nativeQuery = true)
    int getAvailableDriversCount();

    @Query(value = "select driver_id from driver join user on user.username = driver.user_username where user.username=?1", nativeQuery = true)
    String getDriverId(String username);

    @Query(value = "select NEW lk.ijse.car_rental_system.entity.CustomEntity(s.rental_id,s.registration_number,r.pick_up_date,r.pick_up_time,r.return_date,r.return_time,r.location) " +
            "from Schedule s join s.driver d join s.rental r where d.driver_id=?1")
    List<CustomEntity> getDriverSchedule(String driver_id);


}



