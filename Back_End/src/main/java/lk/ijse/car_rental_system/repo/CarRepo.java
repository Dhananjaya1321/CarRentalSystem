package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CarRepo extends JpaRepository<Car, String> {
    @Modifying
    @Query(value = "UPDATE car set status=?1 WHERE registration_number=?2", nativeQuery = true)
    int updateCarStatus(String status, String registration_number);
}
