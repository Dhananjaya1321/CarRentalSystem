package lk.ijse.car_rental_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
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
    private String driver_or_not;
    private String location;
    private String loss_damage_back_slip;
    private LocalDate pick_up_date;
    private LocalTime pick_up_time;
    private LocalDate return_date;
    private LocalTime return_time;
    @ManyToOne
    private Customer customer;
    @OneToMany(mappedBy = "rental",cascade = {CascadeType.ALL})
    private List<Request> requests;
    @OneToMany(mappedBy = "rental",cascade = {CascadeType.ALL})
    private List<Schedule> schedule;
    @OneToMany(mappedBy = "rental",cascade = {CascadeType.ALL})
    private List<RentalCarDetails> rentalCarDetails;

    public Rental(String rental_id, String driver_or_not, String location, String loss_damage_back_slip, LocalDate pick_up_date, LocalTime pick_up_time, LocalDate return_date, LocalTime return_time, Customer customer, List<Request> requests, List<RentalCarDetails> rentalCarDetails) {
        this.rental_id=rental_id;
        this.driver_or_not=driver_or_not;
        this.location=location;
        this.loss_damage_back_slip=loss_damage_back_slip;
        this.pick_up_date=pick_up_date;
        this.pick_up_time=pick_up_time;
        this.return_date=return_date;
        this.return_time=return_time;
        this.customer=customer;
        this.requests=requests;
        this.rentalCarDetails=rentalCarDetails;
    }
}
