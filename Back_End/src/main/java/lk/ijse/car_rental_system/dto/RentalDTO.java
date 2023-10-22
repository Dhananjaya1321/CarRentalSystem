package lk.ijse.car_rental_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentalDTO {
    private String rental_id;
    private String driver_or_not;
    private String location;
    private String loss_damage_back_slip;
    private LocalDate pick_up_date;
    private LocalTime pick_up_time;
    private LocalDate return_date;
    private LocalTime return_time;

    private CustomerDTO customer;

    private List<ScheduleDTO> schedule;

    private List<RentalCarDetails> rentalCarDetails;

}
