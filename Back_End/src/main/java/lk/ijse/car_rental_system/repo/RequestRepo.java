package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.dto.CustomDTO;
import lk.ijse.car_rental_system.entity.CustomEntity;
import lk.ijse.car_rental_system.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface RequestRepo extends JpaRepository<Request,String> {
    @Query(value = "SELECT request_id FROM request ORDER BY request_id DESC LIMIT 1",nativeQuery = true)
    String findLastRequestID();

    @Query("SELECT NEW lk.ijse.car_rental_system.entity.CustomEntity(r.request_id, r.message, r.status, r.rental.rental_id, " +
            "c.registration_number, r2.driver_or_not, r2.location, r2.loss_damage_back_slip," +
            " r2.pick_up_date, r2.pick_up_time, r2.return_date, r2.return_time, r2.customer.nic) " +
            "FROM Request r " +
            "JOIN r.rental r2 " +
            "JOIN r.car c")
    ArrayList<CustomEntity> findAllPendingRequests();
}
