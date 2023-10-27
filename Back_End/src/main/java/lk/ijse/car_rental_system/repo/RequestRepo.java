package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RequestRepo extends JpaRepository<Request,String> {
    @Query(value = "SELECT request_id FROM request ORDER BY request_id DESC LIMIT 1",nativeQuery = true)
    String findLastRequestID();
}
