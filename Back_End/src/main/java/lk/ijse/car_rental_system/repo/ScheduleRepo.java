package lk.ijse.car_rental_system.repo;

import lk.ijse.car_rental_system.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepo extends JpaRepository<Schedule,String> {
}
