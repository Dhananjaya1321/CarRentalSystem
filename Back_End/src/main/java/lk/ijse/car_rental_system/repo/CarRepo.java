package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface CarRepo extends JpaRepository<Car, String> {
    @Modifying
    @Query(value = "UPDATE car set status=?1,mileage_after_maintenance=?2 WHERE registration_number=?3", nativeQuery = true)
    int updateCarStatus(String status, int mileage_after_maintenance, String registration_number);

    @Query(value = "SELECT DISTINCT brand FROM car", nativeQuery = true)
    List<String> searchCarBrands();

    @Query(value = "SELECT DISTINCT price_for_day FROM car", nativeQuery = true)
    List<Double> searchCarDailyRates();

    @Query(value = "SELECT DISTINCT price_for_month FROM car", nativeQuery = true)
    List<Double> searchCarMonthlyRates();

    @Query(value = "SELECT COUNT(registration_number) FROM car where status=?1", nativeQuery = true)
    int getAvailableCarCount(String status);

    @Query(value = "SELECT COUNT(registration_number) FROM car where mileage_after_maintenance>=5000", nativeQuery = true)
    int getNeedMaintenanceCarCount();

}
