package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepo extends JpaRepository<Request,String> {
}
