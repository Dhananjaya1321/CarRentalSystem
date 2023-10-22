package lk.ijse.car_rental_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Schedule {
    @Id
    private String rental_id;
    @Id
    private String driver_id;

    @ManyToOne
    private Rental rental;

    @ManyToOne
    private Driver driver;
}
