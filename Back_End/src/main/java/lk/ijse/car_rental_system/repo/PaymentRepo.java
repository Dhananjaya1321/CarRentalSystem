package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.dto.PaymentDTO;
import lk.ijse.car_rental_system.entity.CustomEntity;
import lk.ijse.car_rental_system.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PaymentRepo extends JpaRepository<Payment, String> {
    @Query(value = "SELECT payment_id FROM payment ORDER BY payment_id DESC LIMIT 1", nativeQuery = true)
    String getLastPaymentID();

    @Query(value = "SELECT *  FROM payment p where p.status='paid' and p.payment_date>='2022-10-10'",nativeQuery = true)
    List<Payment> getAllPaymentFromLastYear(LocalDate date);


}
