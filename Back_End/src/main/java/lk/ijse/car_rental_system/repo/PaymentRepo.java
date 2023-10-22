package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepo extends JpaRepository<Payment,String> {
}
