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
public class RentalCarDetails {
    @Id
    private String registration_number;
    @Id
    private String rental_id;
    @ManyToOne
    private Car car;
    @ManyToOne
    private Rental rental;
}
