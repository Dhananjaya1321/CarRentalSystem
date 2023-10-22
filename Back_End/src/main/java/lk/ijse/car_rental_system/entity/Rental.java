package lk.ijse.car_rental_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Rental {
    @Id
    private String rental_id;
    private LocalDate pick_up_date;
    private LocalTime pick_up_time;
    private LocalDate return_date;
    private LocalTime return_time;
    private String location;
    private String driver_or_not;
    private String loss_damage_back_slip;
    @ManyToOne
    private Customer customer;
    @OneToMany(mappedBy = "rental")
    private List<Schedule> schedule;
    @OneToMany(mappedBy = "rental")
    private List<RentalCarDetails> rentalCarDetails;

}
