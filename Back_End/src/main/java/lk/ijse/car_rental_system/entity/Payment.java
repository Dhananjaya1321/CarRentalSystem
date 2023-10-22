package lk.ijse.car_rental_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Payment {
    @Id
    private String payment_id;
    private String payment_type;
    private double car_fee;
    private double driver_fee;
    private double loss_damage;
    private int mileage;
    private int days;
    private LocalDate payment_date;
    private LocalTime payment_time;
    @ManyToOne
    private Request request;
}
