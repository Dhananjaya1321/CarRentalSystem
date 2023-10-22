package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepo extends JpaRepository<Rental,String> {
}
