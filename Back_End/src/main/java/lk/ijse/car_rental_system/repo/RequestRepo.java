package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.dto.CustomDTO;
import lk.ijse.car_rental_system.entity.CustomEntity;
import lk.ijse.car_rental_system.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public interface RequestRepo extends JpaRepository<Request, String> {
    @Query(value = "SELECT request_id FROM request ORDER BY request_id DESC LIMIT 1", nativeQuery = true)
    String findLastRequestID();

    @Query("SELECT NEW lk.ijse.car_rental_system.entity.CustomEntity(r.request_id, r.message, r.status, r.rental.rental_id, " +
            "c.registration_number, r2.driver_or_not, r2.location, r2.loss_damage_back_slip," +
            " r2.pick_up_date, r2.pick_up_time, r2.return_date, r2.return_time, r2.customer.nic) " +
            "FROM Request r " +
            "JOIN r.rental r2 " +
            "JOIN r.car c")
    ArrayList<CustomEntity> findAllPendingRequests();

    @Modifying
    @Query(value = "update request set message=?2,status=?3 where request_id=?1", nativeQuery = true)
    int updateRequest(String request_id, String message, String status);

    @Query(value = "select count(request_id) from request where status='pending'", nativeQuery = true)
    int getPendingRequestCount();

    @Query(value = "select count(request_id) from request join rental on rental.rental_id = request.rental_rental_id where status='accept' and rental.pick_up_date=?1", nativeQuery = true)
    int getAcceptedRequestRequestCountForTheDay(LocalDate date);

}