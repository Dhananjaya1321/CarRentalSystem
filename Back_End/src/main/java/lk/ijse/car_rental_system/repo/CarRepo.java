package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepo extends JpaRepository<Car,String> {
}
