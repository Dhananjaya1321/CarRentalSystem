package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer,String> {
}
