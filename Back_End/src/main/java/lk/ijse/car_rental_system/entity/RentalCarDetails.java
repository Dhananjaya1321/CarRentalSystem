package lk.ijse.car_rental_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@IdClass(RentalCarDetails_PK.class)
public class RentalCarDetails {
    @Id
    private String rental_id;
    @Id
    private String registration_number;
    @ManyToOne
    @JoinColumn(name = "registration_number", referencedColumnName = "registration_number", insertable = false, updatable = false)
    private Car car;
    @ManyToOne
    @JoinColumn(name = "rental_id", referencedColumnName = "rental_id", insertable = false, updatable = false)
    private Rental rental;
}
